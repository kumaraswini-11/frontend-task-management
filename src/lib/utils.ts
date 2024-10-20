import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { baseUrl } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions<T = unknown> {
  method: HttpMethod;
  body?: T | any;
}

export const apiRequest = async <ResponseType = unknown>(
  urlPath: string,
  { method, body }: ApiRequestOptions<unknown>,
  completeUrl?: string
): Promise<ResponseType> => {
  const url = completeUrl || `${baseUrl}/${urlPath}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to ${method} request to ${url}: ${response.status} ${response.statusText}. Response: ${errorBody}`
    );
  }

  return response.json() as Promise<ResponseType>;
};
