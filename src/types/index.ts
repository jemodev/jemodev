import { z } from "astro:content";

const imageSchema = z.object({
    url: z.string().url(),
    width: z.number(),
    height: z.number(),
});

const featureImageSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema,
});

export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({ rendered: z.string() }),
    content: z.object({ rendered: z.string() }),
    featured_images: featureImageSchema.optional(),
});

export const ExperienceItemSchema = BaseWPSchema.omit({
    featured_images: true,
}).extend({
    acf: z.object({
        rol: z.string(),
        working_time: z.string(),
        url: z.string(),
    }),
    technologies: z.array(z.string()),
});

export const ExperiencesSchema = z.array(ExperienceItemSchema);

export const ProjectItemSchema = BaseWPSchema.extend({
    acf: z.object({
        url: z.string().url(),
    }),
    technologies: z.array(z.string()),
});

export const ProjectsSchema = z.array(ProjectItemSchema);

const CategorySchema = z.object({
    name: z.string(),
    slug: z.string(),
});

const CategoriesSchema = z.array(CategorySchema);

export const PostItemSchema = BaseWPSchema.extend({
    date: z.string(),
    post_categories: CategoriesSchema,
});

export const PostsSchema = z.array(PostItemSchema);

export type Post = z.infer<typeof PostItemSchema>;
