# XamSav — xamsav.es

Web corporativa de **XamSav**, estudio de videojuegos y servicios tecnológicos para videojuegos (Unity, backend, optimización, QA y bug fixing) con sede en Vic, Catalunya.

## Estructura

La web es HTML/CSS/JS estático servido por GitHub Pages desde la carpeta `docs/`.

| Archivo | Contenido |
|---|---|
| `docs/index.html` | Página principal: servicios, portfolio, proceso, estudio y contacto |
| `docs/aviso-legal.html` | Aviso legal (LSSI-CE) |
| `docs/privacidad.html` | Política de privacidad y cookies |
| `docs/404.html` | Página de error |
| `docs/styles.css` | Estilos |
| `docs/main.js` | Menú móvil, animaciones y consentimiento de cookies (Google Analytics 4 `G-514WEWFRSR` solo se carga tras aceptar) y evento `generate_lead` al pulsar el correo |

## Vista previa local

```bash
python -m http.server 8765 --directory docs
```

Y abrir http://localhost:8765.

## SEO

- Dominio canónico: `https://xamsav.es/` (sin www; GitHub redirige www → apex).
- Datos estructurados (JSON-LD) en `index.html`: organización, web, servicios, juegos y FAQ. Validar con https://validator.schema.org y https://search.google.com/test/rich-results.
- Imagen para redes: `docs/img/og-image.png` (1200×630).
- Al añadir páginas indexables, incluirlas en `docs/sitemap.xml` y actualizar `lastmod`.

## Antes de publicar

- Completar los datos marcados en amarillo (`class="todo"`) en `aviso-legal.html` y `privacidad.html` con los datos de la S.L. una vez constituida.
- Confirmar que el buzón `hola@xamsav.es` existe.
