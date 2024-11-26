import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

const client: SanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-11-16',
  useCdn: false
});

export async function getResume(query?: string) {
  const _query =
    query ??
    `*[_type == "resume"][0] {
        ...,
        "logo": *[_type == "logo"][0] {
            ...,
        },
        "contactInfo": *[_type == "contactInfo"][0] {
            ...,
            "socials": *[_type == "social"] 
        },
        "experience": *[_type == "experience"],
        "skills": *[_type == "skills"]
    }`;
  const resume = await client.fetch(_query);
  return resume;
}

export default client;
