const sheetEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

/**
 * Sanitize a string value to prevent formula/CSV injection when written
 * to Google Sheets. Values starting with =, +, -, @ or \t are formula
 * triggers in spreadsheet applications (OWASP CSV Injection).
 */
function sanitizeSheetValue(value) {
  if (typeof value !== "string") return value;
  return value.replace(/^[=+\-@\t]/, "'$&");
}

function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object") return payload;
  return Object.fromEntries(
    Object.entries(payload).map(([key, val]) => [key, sanitizeSheetValue(val)])
  );
}

async function postToSheet(action, payload) {
  if (!sheetEndpoint) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { ok: true, mocked: true };
  }

  const response = await fetch(sheetEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, payload: sanitizePayload(payload) })
  });

  if (!response.ok) {
    throw new Error("Google Sheets sync failed. Please try again.");
  }

  return response.json();
}

export function createCertificateRecord(record) {
  return postToSheet("certificate.create", record);
}

export function renewCertificateRecord(record) {
  return postToSheet("certificate.renew", record);
}
