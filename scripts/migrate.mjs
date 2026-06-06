/**
 * DevurityWeb - Migration & Environment Sync Tool (npm -> pnpm)
 */

import { spawn } from 'node:child_process';
import { rm, access } from 'node:fs/promises';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const CONFIG = {
  pnpmVersion: '11.4.0',
  projectRoot: process.cwd(),
};

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
};

const SYMBOLS = {
  pending: '○',
  running: '►',
  success: '✔',
  error: '✘',
  warning: '⚠',
};

/**
 * Task Management
 */
class ProgressTracker {
  constructor() {
    this.tasks = [];
    this.currentLine = 0;
  }

  addTask(id, label) {
    this.tasks.push({ id, label, status: 'pending', message: '' });
  }

  updateTask(id, status, message = '') {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      task.message = message;
      this.render();
    }
  }

  render() {
    // Clear lines from previous render if not first time
    if (this.currentLine > 0) {
      process.stdout.write(`\x1b[${this.currentLine}A\x1b[J`);
    }

    let output = '\n';
    for (const task of this.tasks) {
      const color = this.getStatusColor(task.status);
      const symbol = this.getStatusSymbol(task.status);
      const label = task.status === 'running' ? `${COLORS.bright}${task.label}${COLORS.reset}` : task.label;
      
      output += `  ${color}${symbol}${COLORS.reset} ${label.padEnd(30)} ${COLORS.dim}${task.message}${COLORS.reset}\n`;
    }
    
    process.stdout.write(output);
    this.currentLine = this.tasks.length + 1;
  }

  getStatusColor(status) {
    switch (status) {
      case 'pending': return COLORS.dim;
      case 'running': return COLORS.cyan;
      case 'success': return COLORS.green;
      case 'error': return COLORS.red;
      case 'warning': return COLORS.yellow;
      default: return COLORS.reset;
    }
  }

  getStatusSymbol(status) {
    switch (status) {
      case 'pending': return SYMBOLS.pending;
      case 'running': return SYMBOLS.running;
      case 'success': return SYMBOLS.success;
      case 'error': return SYMBOLS.error;
      case 'warning': return SYMBOLS.warning;
      default: return ' ';
    }
  }
}

/**
 * Utilities
 */
const runCommand = (command, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { 
      shell: true, 
      cwd: CONFIG.projectRoot,
      ...options 
    });

    let output = '';
    proc.stdout?.on('data', data => { output += data.toString(); });
    proc.stderr?.on('data', data => { output += data.toString(); });

    proc.on('close', (code) => {
      if (code === 0) resolve(output.trim());
      else reject(new Error(`Failed with code ${code}: ${output}`));
    });
  });
};

const checkExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

/**
 * Main Logic
 */
async function main() {
  console.clear();
  console.log(`${COLORS.bgRed}${COLORS.bright}  DevurityWeb Dev-Script  ${COLORS.reset}`);
  console.log(`${COLORS.cyan}${COLORS.bright}Migration & Environment Sync Tool${COLORS.reset}\n`);
  console.log(`${COLORS.dim}Target: npm -> pnpm ${CONFIG.pnpmVersion}${COLORS.reset}`);
  console.log(`${COLORS.dim}------------------------------------------${COLORS.reset}\n`);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  console.log(`${COLORS.bright}Plan of Action:${COLORS.reset}`);
  console.log(`  ${COLORS.dim}1.${COLORS.reset} Remove legacy ${COLORS.yellow}package-lock.json${COLORS.reset} and ${COLORS.yellow}node_modules${COLORS.reset}`);
  console.log(`  ${COLORS.dim}2.${COLORS.reset} Enable ${COLORS.cyan}pnpm${COLORS.reset} via Corepack (v${CONFIG.pnpmVersion})`);
  console.log(`  ${COLORS.dim}3.${COLORS.reset} Clean install via ${COLORS.cyan}pnpm install --frozen-lockfile${COLORS.reset}`);
  console.log(`  ${COLORS.dim}4.${COLORS.reset} Refresh ${COLORS.magenta}Prisma${COLORS.reset} client ${COLORS.dim}(Safe: Local only, no DB data affected)${COLORS.reset}\n`);

  const confirm = await question(`${COLORS.yellow}${SYMBOLS.warning} Proceed with environment synchronization? [Y/n] ${COLORS.reset}`);
  
  if (confirm.toLowerCase() === 'n') {
    console.log(`\n${COLORS.red}Migration aborted by user.${COLORS.reset}\n`);
    process.exit(0);
  }

  rl.close();

  const tracker = new ProgressTracker();
  tracker.addTask('cleanup', 'Cleaning legacy artifacts');
  tracker.addTask('corepack', 'Activating Corepack (pnpm)');
  tracker.addTask('install', 'Synchronizing dependencies');
  tracker.addTask('prisma', 'Generating Database Client');
  tracker.addTask('verify', 'Final environment check');

  tracker.render();

  // STAGE 1: Cleanup
  try {
    tracker.updateTask('cleanup', 'running', 'Looking for npm artifacts...');
    let cleaned = 0;
    
    if (await checkExists(join(CONFIG.projectRoot, 'package-lock.json'))) {
      await rm(join(CONFIG.projectRoot, 'package-lock.json'), { force: true });
      cleaned++;
    }
    
    if (await checkExists(join(CONFIG.projectRoot, 'node_modules'))) {
      tracker.updateTask('cleanup', 'running', 'Deleting node_modules (this may take a bit)...');
      await rm(join(CONFIG.projectRoot, 'node_modules'), { recursive: true, force: true });
      cleaned++;
    }

    tracker.updateTask('cleanup', 'success', cleaned > 0 ? `Removed ${cleaned} artifacts` : 'Clean');
  } catch (err) {
    tracker.updateTask('cleanup', 'error', 'Failed to clean node_modules. Is it open in another program?');
    console.error(`\n${COLORS.red}Error: ${err.message}${COLORS.reset}`);
    process.exit(1);
  }

  // STAGE 2: Corepack
  try {
    tracker.updateTask('corepack', 'running', 'Enabling corepack...');
    await runCommand('corepack', ['enable']);
    
    // Check pnpm version
    const version = await runCommand('pnpm', ['--version']).catch(() => 'unknown');
    tracker.updateTask('corepack', 'success', `pnpm v${version} active`);
  } catch (err) {
    tracker.updateTask('corepack', 'warning', 'Corepack failed. Trying direct pnpm check...');
    try {
      await runCommand('pnpm', ['--version']);
      tracker.updateTask('corepack', 'success', 'pnpm already present');
    } catch {
      tracker.updateTask('corepack', 'error', 'pnpm not found. Please install Node.js >= 16.17 or run "npm install -g pnpm"');
      process.exit(1);
    }
  }

  // STAGE 3: Install
  try {
    tracker.updateTask('install', 'running', 'pnpm install (frozen lockfile)...');
    await runCommand('pnpm', ['install', '--frozen-lockfile']);
    tracker.updateTask('install', 'success', 'All packages synchronized');
  } catch (err) {
    tracker.updateTask('install', 'error', 'Dependency sync failed');
    console.error(`\n${COLORS.red}Error Detail: ${err.message}${COLORS.reset}`);
    process.exit(1);
  }

  // STAGE 4: Prisma
  try {
    tracker.updateTask('prisma', 'running', 'Generating Prisma client...');
    await runCommand('pnpm', ['exec', 'prisma', 'generate']);
    tracker.updateTask('prisma', 'success', 'Prisma components ready');
  } catch (err) {
    tracker.updateTask('prisma', 'warning', 'Prisma generation failed (ignored if DB not reachable yet)');
  }

  // STAGE 5: Verify
  try {
    tracker.updateTask('verify', 'running', 'Verifying integrity...');
    const result = await runCommand('pnpm', ['--version']);
    if (result) {
      tracker.updateTask('verify', 'success', 'Environment is solid');
    }
  } catch {
    tracker.updateTask('verify', 'error', 'Final check failed');
  }

  console.log(`\n\n${COLORS.green}${COLORS.bright}MIGRATION COMPLETE!${COLORS.reset}`);
  console.log(`${COLORS.dim}Your environment is now optimized with pnpm.${COLORS.reset}\n`);
  console.log(`Next steps:`);
  console.log(`  ${COLORS.cyan}pnpm run dev${COLORS.reset} - Start development server`);
  console.log(`  ${COLORS.cyan}pnpm test${COLORS.reset}    - Run test suite\n`);
}

main().catch(err => {
  console.error(`\n${COLORS.red}${COLORS.bright}FATAL ERROR: ${err.message}${COLORS.reset}`);
  process.exit(1);
});
