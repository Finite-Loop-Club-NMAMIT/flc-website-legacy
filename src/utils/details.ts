export function extractStudentDetailsFromEmail(email: string) {
  const batch = parseInt(email.slice(3, 5)) + 2000 + 4;
  const usn = email.split("@")[0] as string;
  const branch = usn.slice(5, 7);
  const year = batch - 2000;
  return { batch, branch, usn, year };
}
