import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function sendRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(getApiBaseUrl() + path, {
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const data = await response.json();
      message = data.error || data.message || message;
    } catch {
      // ignore
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getComputers() {
  return sendRequest("/api/computers");
}

export function createWishlistItem(computerId, note) {
  return sendRequest("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({
      computer: computerId,
      note,
    }),
  });
}

export function createReservation(data) {
  return sendRequest("/api/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}