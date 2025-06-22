import { QueryClient, type QueryFunction } from "@tanstack/react-query";
import { MOCK_ENABLED, mockFetch } from "./mocks";

export type UnauthorizedBehavior = "redirect" | "returnNull";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Use mock fetch if mocks are enabled
    if (MOCK_ENABLED) {
      const res = await mockFetch(queryKey[0] as string);
      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }
      await throwIfResNotOk(res);
      return await res.json();
    }

    // Original fetch logic
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers,
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`${res.status}: ${error.message}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<unknown> {
  // Use mock fetch if mocks are enabled
  if (MOCK_ENABLED) {
    const res = await mockFetch(url, { method, body: data ? JSON.stringify(data) : undefined });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Unknown error" }));
      throw new Error(`${res.status}: ${error.message}`);
    }
    return res.json();
  }

  // Original API request logic
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`${res.status}: ${error.message}`);
  }
  return res.json();
}
