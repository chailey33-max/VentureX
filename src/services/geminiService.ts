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

async function postToAiEndpoint<T>(endpoint: string, payload: Record<string, unknown>): Promise<T> {
  const headers = await getAuthHeader();
  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const rawBody = await response.text();
  if (rawBody.trim().startsWith("<!DOCTYPE") || rawBody.trim().startsWith("<html")) {
    throw new Error("AI endpoint is unavailable in this deployment.");
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
    const data = await postToAiEndpoint<IdeasResponse>("/api/ai/generate-ideas", {
      existingTitles,
    });

    return Array.isArray(data?.ideas) ? data.ideas : [];
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return [];
  }
}

export async function generateBrandNames(ideaTitle: string): Promise<string[]> {
  try {
    const data = await postToAiEndpoint<BrandNamesResponse>("/api/ai/generate-brand-names", {
      ideaTitle,
    });

    return Array.isArray(data?.names) ? data.names : [];
  } catch (error) {
    console.error("Failed to generate AI brand names:", error);
    return [];
  }
}
