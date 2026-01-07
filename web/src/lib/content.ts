import { promises as fs } from "node:fs";
import path from "node:path";

export type Party = {
  id?: string;
  name: string;
  logo_url?: string;
  logo_urls?: string[];
  presidential_candidate?: {
    name?: string;
    first_vice_president?: string;
    second_vice_president?: string;
    photo_url?: string;
    bio?: string;
    pillars?: string[];
    sources?: Array<{ label: string; url: string }>;
  };
  ideology?: string;
  values?: string[];
  stances?: Record<string, string>;
  official_links?: Record<string, string>;
  accent_color?: string;
};

export type QuizQuestion = {
  id: string;
  text: string;
  icon?: string;
  axis?: {
    econ?: number;
    social?: number;
    env?: number;
  };
};

export type Content = {
  design?: unknown;
  parties: Party[];
  quiz?: {
    questions: QuizQuestion[];
  };
};

export async function getContent(): Promise<Content> {
  const filePath = path.join(process.cwd(), "content.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw) as Content;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const withBase = (url?: string) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (basePath && url.startsWith("/")) return `${basePath}${url}`;
    return url;
  };

  if (Array.isArray(data.parties)) {
    data.parties = data.parties.map((party) => ({
      ...party,
      logo_url: withBase(party.logo_url),
      logo_urls: party.logo_urls?.map((u) => withBase(u) as string),
      presidential_candidate: party.presidential_candidate
        ? {
            ...party.presidential_candidate,
            photo_url: withBase(party.presidential_candidate.photo_url),
          }
        : party.presidential_candidate,
    }));
  }

  return data;
}
