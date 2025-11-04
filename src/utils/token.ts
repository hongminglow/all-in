function base64UrlEncode(input: string) {
  return btoa(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function encodeObj(obj: Record<string, unknown>) {
  return base64UrlEncode(JSON.stringify(obj));
}

function randomBase64Url(len = 32) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  // convert to binary string then base64
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return base64UrlEncode(str);
}

export function createJwt(
  payload: Record<string, unknown>,
  expiresInSeconds = 15 * 60
) {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload = { ...payload, iat, exp };
  const token = `${encodeObj(header)}.${encodeObj(
    fullPayload
  )}.${randomBase64Url(32)}`;
  return token;
}

export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const [, payloadB] = token.split(".");
    if (!payloadB) return null;
    const json = atob(payloadB.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  return Math.floor(Date.now() / 1000) >= Number(payload.exp);
}
