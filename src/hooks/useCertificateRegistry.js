import { useEffect, useState } from "react";
import { fetchCertificateRegistry } from "../services/googleSheets";

export function useCertificateRegistry() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRegistry() {
      setIsLoading(true);
      setError("");

      try {
        const nextRows = await fetchCertificateRegistry();
        if (!cancelled) {
          setRows(nextRows);
        }
      } catch (err) {
        if (!cancelled) {
          setRows([]);
          setError(err instanceof Error ? err.message : "Unable to load certificate registry.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadRegistry();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, setRows, isLoading, error };
}
