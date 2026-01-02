# JemoDev Portfolio

Portfolio personal y blog de desarrollo construido con Astro, TailwindCSS y WordPress como CMS headless.

## 🚀 Tecnologías Utilizadas

### Core Framework
- **[Astro](https://astro.build)** `v5.16.4` - Framework web moderno para sitios de contenido
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para JavaScript

### Estilos
- **[TailwindCSS](https://tailwindcss.com)** `v4.1.17` - Framework CSS utility-first
- **[@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite)** `v4.1.17` - Plugin de Vite para TailwindCSS

### Iconos
- **[astro-icon](https://www.astroicon.dev/)** `v1.1.5` - Componente de iconos para Astro
- **[@iconify-json/octicon](https://icon-sets.iconify.design/octicon/)** `v1.2.19` - Set de iconos Octicon
- **[@iconify-json/simple-icons](https://icon-sets.iconify.design/simple-icons/)** `v1.2.63` - Set de iconos Simple Icons

### Syntax Highlighting
- **[Shiki](https://shiki.style/)** `v3.20.0` - Resaltador de sintaxis para bloques de código

### Deployment
- **[@astrojs/netlify](https://docs.astro.build/en/guides/deploy/netlify/)** `v6.6.3` - Adaptador de Astro para Netlify

### Validación de Datos
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript (incluido con Astro)

## 📁 Estructura del Proyecto

```text
/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Recursos del proyecto (imágenes, etc.)
│   ├── components/     # Componentes Astro reutilizables
│   │   ├── blog/      # Componentes relacionados con el blog
│   │   │   ├── BlogPosts.astro
│   │   │   ├── PostCategories.astro
│   │   │   ├── PostItem.astro
│   │   │   └── PostMeta.astro
│   │   ├── experience/ # Componentes de experiencia laboral
│   │   │   ├── ExperienceItem.astro
│   │   │   └── Experiences.astro
│   │   ├── project/   # Componentes de proyectos
│   │   │   ├── ProjectItem.astro
│   │   │   └── Projects.astro
│   │   └── ui/        # Componentes de interfaz
│   │       ├── Footer.astro
│   │       ├── Header.astro
│   │       ├── Logo.astro
│   │       ├── MainNav.astro
│   │       └── SocialNav.astro
│   ├── helpers/       # Funciones auxiliares
│   ├── icons/         # Iconos personalizados
│   ├── layouts/       # Layouts de página
│   │   ├── Layout.astro
│   │   └── PostLayout.astro
│   ├── pages/         # Páginas del sitio
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   └── writing.astro
│   ├── styles/        # Estilos globales
│   └── types/         # Definiciones de tipos TypeScript
│       └── index.ts
├── .env.development   # Variables de entorno (desarrollo)
├── .env.production    # Variables de entorno (producción)
├── astro.config.mjs   # Configuración de Astro
├── tsconfig.json      # Configuración de TypeScript
└── package.json       # Dependencias del proyecto
```

## ⚙️ Configuración

### Variables de Entorno

#### Desarrollo (`.env.development`)
```env
API_URL=http://localhost:10003/wp-json/wp/v2
```

#### Producción (`.env.production`)
```env
API_URL=https://tu-dominio-wordpress.com/wp-json/wp/v2
```

### Configuración de Astro (`astro.config.mjs`)

- **Vite Plugin**: TailwindCSS integrado mediante plugin de Vite
- **Image Domains**: Configurados dominios permitidos para imágenes externas
  - `localhost:10003` (desarrollo)
  - `linen-antelope-447525.hostingersite.com` (producción)
- **Integrations**: 
  - `astro-icon` con soporte para Octicon y Simple Icons
- **Adapter**: Netlify para deployment

### TypeScript (`tsconfig.json`)

- **Extends**: `astro/tsconfigs/strict`
- **Path Aliases**: `@/*` apunta a `src/*`
- **Base URL**: Raíz del proyecto

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                              |
| :---------------- | :-------------------------------------------------- |
| `pnpm install`    | Instala las dependencias                            |
| `pnpm dev`        | Inicia servidor de desarrollo en `localhost:4321`   |
| `pnpm build`      | Construye el sitio para producción en `./dist/`     |
| `pnpm preview`    | Previsualiza la build localmente antes de desplegar |
| `pnpm astro ...`  | Ejecuta comandos CLI de Astro                       |

## 🎨 Características

- **Blog con WordPress Headless**: Contenido gestionado desde WordPress, renderizado con Astro
- **Syntax Highlighting**: Bloques de código con resaltado de sintaxis usando Shiki
- **Categorías de Posts**: Sistema de categorización para artículos del blog
- **Portfolio de Proyectos**: Showcase de proyectos con tecnologías utilizadas
- **Experiencia Laboral**: Timeline de experiencia profesional
- **Responsive Design**: Diseño adaptable construido con TailwindCSS
- **TypeScript**: Tipado estático con validación de esquemas mediante Zod
- **Página 404 Personalizada**: Página de error personalizada
- **SEO Optimizado**: Meta tags y estructura semántica

## 🔗 Integración con WordPress

El proyecto consume datos de WordPress mediante la REST API (`/wp-json/wp/v2`):

- **Posts**: Artículos del blog con categorías y featured images
- **Projects**: Proyectos con ACF (Advanced Custom Fields)
- **Experience**: Experiencia laboral con ACF

Los esquemas de validación se encuentran en `src/types/index.ts` usando Zod.

## 📦 Deployment

El proyecto está configurado para desplegarse en **Netlify** mediante el adaptador `@astrojs/netlify`.

## 📄 Licencia

Este es un proyecto personal de portfolio.
