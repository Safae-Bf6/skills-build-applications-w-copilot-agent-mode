const normalizePayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = [
      payload.results,
      payload.items,
      payload.data,
      payload.docs,
      payload.records,
      payload.results?.results,
      payload.data?.results,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }

    if (payload.pagination) {
      const paginationCandidates = [payload.pagination.results, payload.pagination.items, payload.pagination.data];

      for (const candidate of paginationCandidates) {
        if (Array.isArray(candidate)) {
          return candidate;
        }
      }
    }
  }

  return [];
};

const normalizeResource = (resource = '') => {
  const trimmedResource = resource.trim();
  const withoutLeadingSlash = trimmedResource.startsWith('/') ? trimmedResource.slice(1) : trimmedResource;

  if (!withoutLeadingSlash) {
    return 'api/';
  }

  const withApiPrefix = withoutLeadingSlash.startsWith('api/') ? withoutLeadingSlash : `api/${withoutLeadingSlash}`;
  return `${withApiPrefix.replace(/\/+$/, '')}/`;
};

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }

  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
    return 'http://localhost:8000';
  }

  if (hostname.includes('app.github.dev')) {
    return `https://${hostname.replace(/-5173(?=\.|$)/, '-8000')}`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => {
  const normalizedResource = normalizeResource(resource);
  return `${getApiBaseUrl()}${normalizedResource.startsWith('/') ? normalizedResource : `/${normalizedResource}`}`;
};

export const fetchCollection = async (resource) => {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizePayload(payload);
};
