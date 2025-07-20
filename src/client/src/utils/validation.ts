export const ValidateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function extractNameFromEmail(email: string): string {
  const username = email.split("@")[0];
  return username
    .replace(/[_\-]/g, " ")
    .split(".")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}