# XamSav — xamsav.es

Portfolio y web de **XamSav**, nombre con el que Samuel Viguera publica sus videojuegos indie hechos con Unity y ofrece trabajos de programación, backend, optimización y QA para otros proyectos. Vic, Barcelona.

## Estructura

La web es HTML/CSS/JS estático servido por GitHub Pages desde la carpeta `docs/`.

| Archivo | Contenido |
|---|---|
| `docs/index.html` | Página principal: juegos propios, servicios, sobre mí, FAQ y contacto |
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
- Datos estructurados (JSON-LD) en `index.html`: persona (Samuel Viguera / XamSav), web, servicios ofrecidos, juegos y FAQ. Validar con https://validator.schema.org y https://search.google.com/test/rich-results.
- Imagen para redes: `docs/img/og-image.png` (1200×630).
- Al añadir páginas indexables, incluirlas en `docs/sitemap.xml` y actualizar `lastmod`.

## Antes de publicar

- Si se constituye la S.L. o se empieza a facturar, actualizar titular, NIF y domicilio en `aviso-legal.html` y `privacidad.html` (la LSSI los exige cuando hay actividad económica).
- Confirmar que el buzón `samuel81@hotmail.es` existe.
