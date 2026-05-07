const sheetEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

function getSheetEndpoint() {
  if (!sheetEndpoint) {
    throw new Error("Google Sheets endpoint is not configured.");
  }

  return sheetEndpoint;
}

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

function normalizeRegistryRows(payload) {
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.rows)
      ? payload.rows
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

  return rows
    .map((row, index) => ({
      id: String(row?.id ?? row?.certNo ?? `cert-${index + 1}`),
      certNo: String(row?.certNo ?? "").trim(),
      name: String(row?.name ?? "").trim(),
      course: String(row?.course ?? "").trim(),
      cohort: String(row?.cohort ?? "").trim(),
      issueDate: String(row?.issueDate ?? "").trim(),
      expireDate: String(row?.expireDate ?? "").trim(),
      status: String(row?.status ?? "pending").trim() || "pending",
      verifier: String(row?.verifier ?? "").trim(),
      sheetRow: row?.sheetRow ?? row?.row ?? null
    }))
    .filter((row) => row.certNo && row.name);
}

export async function fetchCertificateRegistry() {
  const requestUrl = new URL(getSheetEndpoint());
  requestUrl.searchParams.set("action", "certificate.list");

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("Unable to load certificate registry from Google Sheets.");
  }

  return normalizeRegistryRows(await response.json());
}

async function postToSheet(action, payload) {
  const response = await fetch(getSheetEndpoint(), {
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
