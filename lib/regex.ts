/**
 * Validates that an email belongs to the exact @usco.edu.co institutional domain.
 * The local part must not start or end with a dot, and must not contain consecutive dots.
 *
 * @param email - Email address to validate (should be pre-normalized to lowercase).
 * @returns `true` if the address matches the institutional format, `false` otherwise.
 */
export const emailUniversity = (email: string): boolean =>
  /^[a-zA-Z0-9_%+-]+(\.[a-zA-Z0-9_%+-]+)*@usco\.edu\.co$/.test(email);

export const email = (email: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{8,}$/.test(
    password,
  );
