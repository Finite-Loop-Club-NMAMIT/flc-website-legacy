export function extractStudentName(name: string) {
  if (name.startsWith("4NM")) {
    name = name.split(" ").slice(1).join(" ");
    return name;
  }
  return name;
}
