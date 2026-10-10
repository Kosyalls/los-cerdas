# Validación — 10-10-2026

La dirección base fue aprobada por Sergi («me encanta»); la revisión GTA, la publicación pública, la mejora móvil y la incorporación de todas las imágenes están autorizadas. Esta versión implementa la galería completa de fotos y su conservación offline; los vídeos y las demás secciones completas siguen pendientes.

## Fotos y originales

- Las **41 imágenes** del inventario aparecen en la galería: 32 horizontales/cuadradas y 9 verticales. No se descartan variantes de la misma escena.
- Todos los JPEG se decodifican en la galería online y en la copia extraída del ZIP.
- El ZIP contiene los **41 originales fotográficos**, cada uno cotejado por SHA-256 con el inventario. CRC correcto de todos los miembros.
- Los 44 archivos fuente siguen intactos: 43 recuerdos (41 imágenes y 2 vídeos) y una grabación fuente musical, registrada aparte. Ambos MOV de recuerdos y el MP3 ya se decodificaron completos sin errores.
- TypeScript estricto y compilaciones Vite/IIFE aprobados.

## Móvil y escritorio

304 comprobaciones funcionales online aprobadas en **Chromium y WebKit**: nueve tamaños por motor (320×568, 360×640, 375×667, 390×844, 414×896, 430×932, 768×1024, 844×390 y 568×320).

Se comprueban acceso visible en vertical, ausencia de desbordamiento horizontal, cabecera alcanzable al desplazarse, menú con foco contenido y fondo bloqueado, las 41 fotos, filtros, visor, navegación anterior/siguiente con vuelta al principio, flechas de teclado, controles táctiles y retorno a galería al cerrar la foto.

Cuatro revisiones axe actuales (archivo y galería en cada motor a 390 px) sin infracciones detectadas para las etiquetas WCAG A/AA seleccionadas. La fase anterior había pasado nueve revisiones axe y 62 comprobaciones de la maqueta con música; son evidencias históricas, no un sustituto de revisión manual completa.

Los cambios específicos de móvil se compararon en ocho capturas de escritorio, a 1024/1440/1920 px: **cero diferencias de píxeles**. Esta comparación se realizó antes de incorporar la galería completa; la nueva galería y sus controles son contenido añadido deliberadamente también para PC. La galería de escritorio se comprobó después en ambos motores.

Capturas de la nueva galería móvil inspeccionadas. No se han probado todavía móviles físicos.

## Offline

ZIP actual: `public/downloads/los-cerdas-maqueta-offline.zip`, **34.202.700 bytes (34,2 MB)**. Incluye web interactiva, 41 fotos, 41 originales, cuatro retratos, MP3, fuente/licencia, catálogo, hashes y `GALERIA.html` sin JavaScript.

La copia recién extraída a `/tmp/Los Cerdas - copia sin Internet/` abre `index.html` mediante **file://**, sin servidor ni caché previa. 26 comprobaciones adicionales offline/escritorio aprobadas en Chromium y WebKit: música local y silencio, todas las fotos decodificadas, acceso al original en otra pestaña, dimensiones originales, cierre de diálogos y galería estática con las 41 imágenes sin JavaScript. **Cero solicitudes HTTP/HTTPS y cero errores JavaScript.**

Chromium se prueba con emulación offline activada. En este entorno aislado, la emulación offline de WebKit rechaza incluso la navegación file://; se verificó la misma copia con cualquier solicitud HTTP/HTTPS abortada y ninguna solicitud externa producida.

Un fallo encontrado en la prueba inicial: `download` sobre file:// abría la foto en la misma pestaña. Se cambió el control a «Abrir original», en una pestaña independiente, y se volvió a comprobar la copia final en ambos motores. Los originales ya están guardados dentro del ZIP.

Evidencia local (excluida de Git): `evidence/verification-final.json`, `offline-final-report.json`, `mobile-gallery-report.json`, `mobile-chromium-*.png`, `mobile-webkit-*.png` y `desktop-before/after-*.png`. El informe inicial de galería conserva el fallo corregido; el agregado final recoge su resolución y el nuevo resultado. Se utilizó QA aislada porque el navegador integrado no estaba disponible; no se usaron perfiles personales.

## Publicación y alcance

Web pública en https://los-cerdas.vercel.app; repositorio público en https://github.com/Kosyalls/los-cerdas. Publicación y verificación anónima descritas en `PUBLICACION.md`; evidencia de producción en `evidence/publication-report.json`.

La cronología, los vídeos, los secretos y el expediente especial completo siguen en diseño. Las cuatro fichas individuales ya incorporan los textos aportados por Sergi. Las fechas permanecen sin confirmar y las identidades solo proceden de instrucciones explícitas de Sergi. Los dos vídeos originales no están aún en el ZIP.

## Fichas personalizadas y acceso visible a todas las fotos

264 comprobaciones adicionales aprobadas en Chromium/WebKit: las cuatro fichas desde cada retrato, sus textos exactos y retratos confirmados, selector de sospechosos desde el índice, cierre por botón/Escape, retorno entre diálogos, controles de 44 px, ausencia de desbordamiento y contenido offline. Tamaños: 1440×1000, 390×844, 320×568 y 844×390. Cuatro revisiones axe sobre las nuevas fichas móviles sin infracciones detectadas. El nuevo botón «VER LAS 41 FOTOS» al principio del expediente abre las 41 en todos esos tamaños y motores. Capturas de Kili en PC/móvil inspeccionadas. Evidencia: `evidence/suspects-report.json` y `ficha-*.png`.
