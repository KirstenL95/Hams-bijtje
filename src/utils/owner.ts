export function isOwnerHost(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const host = window.location.hostname;
    // Strict set of hosts allowed for owner actions
    const allowed = ["localhost", "127.0.0.1", "::1"];
    return allowed.includes(host);
  } catch {
    return false;
  }
}
