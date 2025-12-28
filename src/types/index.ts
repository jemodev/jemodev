import { z } from "astro:content";

export const BaseWPSchema = z.object({
    id: z.number(),
    title: z.object({ rendered: z.string() }),
    content: z.object({ rendered: z.string() }),
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


