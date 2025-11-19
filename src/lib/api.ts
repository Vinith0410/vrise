type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export async function postJson<T = undefined>(endpoint: string, payload: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = (body && body.message) || "Something went wrong. Please try again.";
    throw new Error(errorMessage);
  }

  return body as ApiResponse<T>;
}

