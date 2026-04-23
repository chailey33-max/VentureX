import { auth } from "../firebase";
import { BusinessIdea } from "../types";

type IdeasResponse = {
  ideas: BusinessIdea[];
};

type BrandNamesResponse = {
  names: string[];
};

async function getAuthHeader(): Promise<Record<string, string>> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Please sign in to use AI generation.");
  }

  const token = await currentUser.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function postToAiEndpoint<T>(
  endpoint: string,
  netlifyFunctionEndpoint: string,
  payload: Record<string, unknown>
): Promise<T> {
  const headers = await getAuthHeader();
  const requestInit: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  };

  let response = await fetch(endpoint, requestInit);
  let rawBody = await response.text();

  // Netlify static deployments may not route /api/* unless explicit redirects/functions exist.
  // Fallback directly to function path if we detect HTML/404 from platform.
  if (rawBody.trim().startsWith("<!DOCTYPE") || rawBody.trim().startsWith("<html") || response.status === 404) {
    response = await fetch(netlifyFunctionEndpoint, requestInit);
    rawBody = await response.text();
  }

  let parsed: any = null;
  if (rawBody) {
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      throw new Error("Server returned invalid response format.");
    }
  }

  if (!response.ok) {
    throw new Error(parsed?.error || `Server error: ${response.status}`);
  }

  return parsed as T;
}

export async function generateNewIdeas(existingTitles: string[]): Promise<BusinessIdea[]> {
  try {
    const data = await postToAiEndpoint<IdeasResponse>(
      "/api/ai/generate-ideas",
      "/.netlify/functions/generate-ideas",
      { existingTitles }
    );

    return Array.isArray(data?.ideas) ? data.ideas : [];
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return [];
  }
}

export async function generateBrandNames(ideaTitle: string): Promise<string[]> {
  try {
    const data = await postToAiEndpoint<BrandNamesResponse>(
      "/api/ai/generate-brand-names",
      "/.netlify/functions/generate-brand-names",
      { ideaTitle }
    );

    return Array.isArray(data?.names) ? data.names : [];
  } catch (error) {
    console.error("Failed to generate AI brand names:", error);
    return [];
  }
}
