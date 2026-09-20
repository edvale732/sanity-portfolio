import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "l33zytkl",
  dataset: "production",
  apiVersion: '2026-02-01',
  useCdn: true,
  stega: {
    studioUrl: 'http://localhost:3333',
  },
});