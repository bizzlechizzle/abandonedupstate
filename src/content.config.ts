import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      seoTitle: z.string().optional(),
      description: z.string(),
      seoDescription: z.string().optional(),
      featured: z.boolean().optional(),
      featuredCaption: z.string().optional(),
      featuredDescription: z.string().optional(),
      displayTitleInLayout: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      heroImage: image().or(z.string()).optional(),
      heroImageAlt: z.string().optional(),
      heroImageCaption: z.string().optional(),
      seoImage: image().or(z.string()).optional(),
      ogImage: image().or(z.string()).optional(),
      galleryImages: z
        .array(
          z.object({
            src: z.string(),
            caption: z.string(),
            seoCaption: z.string(),
            historical: z.boolean().optional(),
          })
        )
        .default([]),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog };
