const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}
