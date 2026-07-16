const BASE = ''; // same-origin (Vite proxy handles /api/* and /v1/*)

export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit = {}
): Promise<T | null> {
  // Destructure so custom headers merge into the default Content-Type,
  // and spread-opts doesn't overwrite credentials or merged headers.
  const { headers: customHeaders, ...restOpts } = opts;

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...restOpts,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
    });

    if (res.status === 401) {
      return null; // caller handles redirect to landing
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      // Go backend always returns {"error": {"message": "...", "type": "..."}}
      const msg = (errBody as any)?.error?.message || res.statusText;
      throw new Error(msg);
    }

    return res.json() as T;
  } catch (err) {
    // Network errors (DNS, connection refused, timeout) — re-throw as user-friendly
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('Network error — is the backend running?');
    }
    throw err;
  }
}
