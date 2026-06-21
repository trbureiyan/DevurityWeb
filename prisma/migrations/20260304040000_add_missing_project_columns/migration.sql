-- AlterTable: Add missing columns to projects table
-- The init migration was baselined (marked applied without executing),
-- so these 7 columns exist in schema.prisma but NOT in the production database.

-- Step 1: Add columns (nullable first for slug to allow backfill)
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "stage" TEXT NOT NULL DEFAULT 'incubacion';
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "focus_areas" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "stack" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "hero_image" TEXT;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "cta_label" TEXT;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "cta_href" TEXT;

-- Step 2: Backfill slug from title for any existing rows
UPDATE "projects"
SET "slug" = LOWER(REGEXP_REPLACE(TRIM("title"), '\s+', '-', 'g'))
WHERE "slug" IS NULL;

-- Step 3: Make slug NOT NULL now that all rows have a value
ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;

-- Step 4: Create unique index on slug (if not already present)
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_key" ON "projects"("slug");
