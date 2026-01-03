# Cómo Consumir la API REST de WordPress desde Astro

WordPress incluye una API REST integrada que permite acceder a todo el contenido de forma programática. En este artículo aprenderás a consumir esta API desde Astro de manera simple y segura.

## ¿Qué es WordPress Headless?

WordPress Headless es usar WordPress únicamente como gestor de contenido (CMS), mientras que el frontend se construye con otra tecnología, en este caso Astro. La comunicación entre ambos se realiza mediante la API REST de WordPress.

## Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.development` para almacenar la URL de tu API:

```env
API_URL=http://localhost:10003/wp-json/wp/v2
```

Para producción, crea `.env.production`:

```env
API_URL=https://tu-sitio-wordpress.com/wp-json/wp/v2
```

Astro cargará automáticamente el archivo correcto según el entorno.

## Validación con Zod

Es fundamental validar los datos que vienen de la API. Zod es perfecto para esto y viene integrado con Astro.

### Definir Schemas

Crea un archivo `src/types/index.ts` con los schemas:

```typescript
import { z } from "astro:content";

// Schema base para contenido de WordPress
export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({ rendered: z.string() }),
    content: z.object({ rendered: z.string() }),
});

// Schema para un post individual
export const PostItemSchema = BaseWPSchema.extend({
    date: z.string(),
    excerpt: z.object({ rendered: z.string() }),
});

// Schema para array de posts
export const PostsSchema = z.array(PostItemSchema);

// Tipo TypeScript exportado
export type Post = z.infer<typeof PostItemSchema>;
```

## Consumiendo la API

### Obtener Lista de Posts

En cualquier componente `.astro`, usa el frontmatter para hacer fetch:

```astro
---
import { PostsSchema } from "@/types";

const url = `${import.meta.env.API_URL}/posts`;
const response = await fetch(url);
const json = await response.json();
const posts = PostsSchema.safeParse(json);

if (!posts.success) {
    console.error("Error validando posts:", posts.error);
}

const validPosts = posts.success ? posts.data : [];
---

<div>
    {validPosts.map((post) => (
        <article>
            <h2 set:html={post.title.rendered} />
            <div set:html={post.excerpt.rendered} />
            <a href={`/blog/${post.slug}`}>Leer más</a>
        </article>
    ))}
</div>
```

### Obtener Post Individual

Para páginas dinámicas, usa `[slug].astro`:

```astro
---
import { PostItemSchema } from "@/types";

export const prerender = false; // SSR activado

const { slug } = Astro.params;
const url = `${import.meta.env.API_URL}/posts?slug=${slug}`;
const response = await fetch(url);
const json = await response.json();
const post = PostItemSchema.safeParse(json[0]);

if (!post.success) {
    return Astro.redirect("/404");
}

const { title, content, date } = post.data;
---

<article>
    <h1 set:html={title.rendered} />
    <time>{date}</time>
    <div set:html={content.rendered} />
</article>
```

## Trabajando con Imágenes

WordPress devuelve las imágenes destacadas en diferentes tamaños. Define un schema para validarlas:

```typescript
const imageSchema = z.object({
    url: z.string().url(),
    width: z.number(),
    height: z.number(),
});

const featureImageSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    large: imageSchema,
    full: imageSchema,
});

export const PostItemSchema = BaseWPSchema.extend({
    featured_images: featureImageSchema.optional(),
});
```

### Configurar Dominios Permitidos

En `astro.config.mjs`, permite las imágenes de WordPress:

```javascript
export default defineConfig({
    image: {
        domains: ["tu-sitio-wordpress.com"]
    },
});
```

### Usar las Imágenes en Componentes

```astro
---
import { Picture } from "astro:assets";
---

{post.featured_images?.full.url && (
    <Picture
        src={post.featured_images.full.url}
        alt={post.title.rendered}
        width={post.featured_images.full.width}
        height={post.featured_images.full.height}
        formats={["avif", "webp"]}
    />
)}
```

## Custom Fields con ACF

Si usas Advanced Custom Fields, añade los campos personalizados al schema:

```typescript
export const ProjectSchema = BaseWPSchema.extend({
    acf: z.object({
        url: z.string().url(),
        github_repo: z.string().optional(),
    }),
    technologies: z.array(z.string()),
});
```

Accede a ellos normalmente:

```astro
---
const { acf, technologies } = project;
---

<a href={acf.url}>Ver Proyecto</a>
<ul>
    {technologies.map(tech => <li>{tech}</li>)}
</ul>
```

## Endpoints Comunes

La API REST de WordPress ofrece varios endpoints:

- `/posts` - Artículos del blog
- `/pages` - Páginas
- `/categories` - Categorías
- `/tags` - Etiquetas
- `/media` - Archivos multimedia
- `/users` - Usuarios

Todos siguen el mismo patrón de consumo.

## Mejores Prácticas

1. **Siempre valida con Zod**: Usa `.safeParse()` en lugar de `.parse()` para manejar errores gracefully.

2. **Maneja errores**: Redirige a 404 o muestra mensajes apropiados cuando falle la validación.

3. **Usa SSR cuando sea necesario**: Añade `export const prerender = false` en páginas que necesiten datos en tiempo real.

4. **Tipado fuerte**: Exporta tipos desde tus schemas con `z.infer<>` para aprovechar TypeScript.

5. **Variables de entorno**: Nunca hardcodees URLs de APIs, usa variables de entorno.

## Conclusión

Consumir la API REST de WordPress desde Astro es simple y directo. La combinación de validación con Zod y el sistema de componentes de Astro te permite crear sitios rápidos y seguros, aprovechando la familiaridad de WordPress como CMS.

El resultado es un sitio estático o con SSR que obtiene contenido de WordPress, pero con el rendimiento y la experiencia de desarrollo moderna que ofrece Astro.
