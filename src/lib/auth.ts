export function isExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) return true;

    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return true;

    const nowInSeconds = Math.floor(Date.now() / 1000);

    return payload.exp < nowInSeconds + 30;
  } catch (e) {
    console.error("Failed to parse token:", e);

    return true;
  }
}
