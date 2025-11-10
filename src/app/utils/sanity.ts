import { createClient as createSanityClient } from "next-sanity";

export const sanityClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  apiVersion: "2025-11-09",
  useCdn: false,
});
