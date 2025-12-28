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
    title: z.object({ rendered: z.string() }),
    content: z.object({ rendered: z.string() }),
    featured_images: featureImageSchema,
});

export const ExperienceItemSchema = BaseWPSchema.pick({
    id: true,
    title: true,
    content: true,
}).extend({
    acf: z.object({
        rol: z.string(),
        working_time: z.string(),
        url: z.string(),
    }),
});

export const ExperiencesSchema = z.array(ExperienceItemSchema);


