const base = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return base + path.replace(/^\//, "");
}
