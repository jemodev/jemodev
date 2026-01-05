// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    output: "server",

    vite: {
        plugins: [tailwindcss()],
    },

    image: {
        domains: ["localhost:10003", "linen-antelope-447525.hostingersite.com"],
    },

    integrations: [
        icon({
            include: {
                octicon: ["*"],
                "simple-icons": ["*"],
            },
        }),
    ],

    adapter: netlify(),
});
