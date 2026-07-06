const normalizePayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const arrayKeys = ['results', 'items', 'data', 'docs', 'records'];

    for (const key of arrayKeys) {
      if (Array.isArray(payload[key])) {
        return payload[key];
      }
    }

    if (payload.pagination && Array.isArray(payload.pagination.results)) {
      return payload.pagination.results;
    }
  }

  return [];
};

export const getApiBaseUrl = () => {
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

export const buildApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}`;

export const fetchCollection = async (resource) => {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizePayload(payload);
};
