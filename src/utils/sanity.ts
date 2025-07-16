import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

const client: SanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET,
  apiVersion: '2024-11-16',
  useCdn: false
});

async function getSanityData(query: string) {
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

export async function getPortfolioPieces() {
  const query = `*[_type == "portfolioPiece"]{
                    "slug": slug.current,
                    title,
                    description,
                    tags[]->{
                      title,
                      slug
                    },
                    "featuredImageUrl": featuredImage.asset->url
                }`;
  return getSanityData(query);
}

export async function getPortfolioPiece(slug: string) {
  const query = `*[
                    _type == "portfolioPiece" &&
                    slug.current == '${slug}'
                  ][0]{
                    title,
                    description,
                    "featuredImageUrl": featuredImage.asset->url,
                    tags[]->{
                      title,
                      slug
                    },
                    sections[]{
                      heading,
                      description,
                      "imageUrl": image.asset->url
                    }
                }`;
  return getSanityData(query);
}

export default client;
