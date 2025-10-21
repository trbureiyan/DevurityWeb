export const emailUniversity = (email: string): boolean =>
  /^u\d{8,}@usco\.edu\.co$/.test(email);

export const email = (email: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
