import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

const client: SanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-11-16',
  useCdn: false
});

async function getSanityData(query: string) {
  console.log('getSanityData query:', query);
  const data = await client.fetch(query);
  return data;
}

export async function getResume() {
  const _query = `*[_type == "resume"][0] {
                    ...,
                    "logo": logo->,
                    "contactInfo": contactInfo->{
                      ...,
                      "socials": *[_type == "social"]
                    },
                    "experience": experience[]->{...},
                    "education": education[]->{...},
                    "skills": skills[]->{...},
                    educationEnabled
                  }`;
  const resume = await getSanityData(_query);
  return resume;
}

export async function getCoverLetter(id: string) {
  const _query = `*[_type == "coverLetter" && _id == '${id}'][0] {
                    ...,
                    "logo": logo->,
                      "contactInfo": contactInfo->{
                        ...,
                        "socials": *[_type == "social"]
                      },
                  }`;
  const coverLetter = await getSanityData(_query);
  return coverLetter;
}

export default client;
