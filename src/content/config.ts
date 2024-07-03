import { defineCollection, z } from "astro:content";

export const collections = {
  work: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      overview: z.string().optional(),
      details: z
        .object({
          brief: z.string().optional(),
          members: z.string().optional(),
          role: z.string().optional(),
        })
        .optional(),
      link: z.string().optional(),
      draft: z.boolean().optional(),
    }),
  }),
};
