# Auditoría audiovisual — 10 de octubre de 2026

Fuente: originales en `/Users/kosy/kili`. Primera revisión: 28 archivos. Durante la sesión Sergi añadió 15 PNG; inventario actualizado: **43 archivos**. Se verificó el SHA-256 de los originales previamente inventariados antes de incorporar los nuevos. Los IDs previos se conservan.

| Material | Cantidad | Tamaño decimal | Características |
| --- | ---: | ---: | --- |
| JPG | 1 | 0,045 MB | 720 × 479; sin fecha EXIF |
| PNG | 40 | 26,809 MB | Capturas, sin fecha EXIF original |
| MOV | 2 | 141,804 MB | H.264 + AAC mono; rotación −90° |
| Total | 43 | 168,658 MB | 41 imágenes y 2 vídeos |

32 imágenes horizontales y 9 verticales. Resoluciones desde 141 px de ancho hasta 1684 px; alturas de 203 a 920 px. No hay duplicados exactos por SHA-256. Las cifras incluyen todas las versiones de una misma escena.

## Vídeos

| ID | Archivo | Duración | Imagen | Audio | Fecha en metadatos |
| --- | --- | ---: | --- | --- | --- |
| LC-027 | IMG_0272.MOV | 48,348 s | 1280 × 720 codificado; 720 × 1280 mostrado; 29,97 fps; 10,77 Mbps | AAC, 44,1 kHz, mono | 2013-11-21 12:35:22 UTC |
| LC-028 | IMG_0357.MOV | 57,977 s | 1280 × 720 codificado; 720 × 1280 mostrado; 29,97 fps; 10,59 Mbps | AAC, 44,1 kHz, mono | 2013-12-03 10:58:03 UTC |

Duración conjunta: **106,325 segundos**. FFmpeg decodificó ambos completos sin errores. Se inspeccionaron tres fotogramas de cada uno; esto no sustituye la revisión editorial de la acción completa ni del audio. No se transcribieron conversaciones ni se inventaron títulos de aventuras.

Ambos MOV contienen metadatos de ubicación. El informe registra su presencia, sin copiar coordenadas. Los originales se conservan tal cual; las futuras copias de consulta eliminarán metadatos privados.

## Calidad y selección

- LC-001 / LC-020: misma escena de grupo en JPG y captura PNG. Confirmado visualmente; conservar ambos. Tras la petición de incluir todas las imágenes, ambas variantes aparecen en la galería.
- LC-026 / LC-031 y LC-037 / LC-039: escenas repetidas en capturas con encuadres diferentes. Confirmación visual para agruparlas como variantes; no borrar originales.
- LC-002 (207 × 203) y LC-012 (141 × 394): resolución insuficiente para retratos grandes. Mantener como detalle o prueba pequeña, sin prometer recuperación de detalle ni ampliar mediante IA.
- Predominan fotos de grupo en interiores, registros nocturnos, playa/piscina, coche y viajes. Son categorías de contenido visible, no anécdotas ni fechas confirmadas.
- Algunas imágenes llevan texto o marcas incrustadas. Se conservan en los originales y derivados; no se eliminan ni se atribuye su autoría al grupo.
- Las fechas 9–10 de octubre de 2026 del nombre de las capturas corresponden a la captura. **No datan los recuerdos.** El JPG contiene «2016-11-22» en su nombre, pero tampoco tiene EXIF que confirme la fecha del episodio.

## Identidades confirmadas

Sergi identificó explícitamente `Captura de pantalla 2026-10-10 a las 9.59.43.png` (LC-043). De izquierda a derecha: **Kili → Coco → Jowi → Luizao**. Kili, alias Il Mafias, es el novio; Luizao tiene el alias Gitano. Los cuatro retratos de muestra se recortan de esta referencia. La asignación procede de esta instrucción y sus posiciones, no de un cotejo facial con otros archivos.

## Optimización prevista después de validar el diseño

Fotografías: JPEG de respaldo y WebP para consulta, sin superar las dimensiones originales; miniaturas de 320/640 px según tamaño disponible. AVIF opcional únicamente si aporta una reducción útil. Mantener color natural en el visor; el grano y la desaturación del marco son CSS.

Vídeo: conservar MOV original, generar MP4 H.264 / AAC con orientación normalizada, `yuv420p`, `faststart`, sin metadatos de ubicación; medir calidad y peso antes de escoger CRF. Conservar 720 × 1280 como máximo y ofrecer 480 × 854 si es útil en móvil. Reproducción con `preload="none"`, póster local y sin autoplay. No se han transcodificado los originales en esta fase.

Objetivo inicial de la versión web: aplicación, medios derivados y fuentes por debajo de **80 MB**, reservando margen frente a la subida CLI de Hobby. Es un presupuesto propuesto, no un tamaño medido ni una garantía de hosting gratuito. [Límites de Vercel](https://vercel.com/docs/limits), consultados el 10-10-2026.

## Evidencias reproducibles

`audit/inventory.json`: tamaño, formato, dimensiones, SHA-256, streams y fechas técnicas. `audit/video-decode.json`: resultado de la decodificación. `audit/contact-images-1.jpg` a `contact-images-4.jpg`: todas las imágenes. `audit/contact-videos.jpg`: muestras de ambos vídeos. `scripts/audit_media.py`: lectura de originales y producción de estos informes.

Pendientes editoriales: fechas reales, explicación de cada escena, contenido del audio y nuevas aportaciones. Sergi ha autorizado expresamente la publicación pública y la inclusión de todas las imágenes; no se descartan variantes.

## Incorporación de todas las imágenes y publicación

Revisión de la raíz el 10-10-2026: las 41 imágenes del inventario cubren todas las fuentes fotográficas disponibles, sin aportaciones adicionales posteriores. `scripts/prepare_photos.py` verifica los hashes, conserva las siete copias JPEG ya aprobadas y genera las otras 34, sin ampliar por encima de su resolución original. Las copias JPEG suman 3.063.852 bytes (3,06 MB); catálogo en `public/media/catalog.json` y datos tipados en `src/data/photos.ts`.

Las 41 aparecen en la galería pública (32 horizontales/cuadradas, 9 verticales). El ZIP offline contiene además los 41 originales fotográficos, verificados contra el inventario por SHA-256. No incorpora todavía los dos MOV de aventuras. Publicación documentada en `PUBLICACION.md`.

## Recurso de producción añadido — banda sonora

Después de la aprobación de arte, Sergi añadió una grabación MOV de 200.961.560 bytes para extraer el tema GTA IV. Se conserva en la raíz, con su hash en `audit/soundtrack.json`. Se trata como recurso musical, separado de las 41 imágenes y los dos vídeos de aventuras; `audit_media.py` respeta esa separación y `verify_originals.py` verifica ambas fuentes. El MP3 derivado ocupa 4.124.101 bytes y se incluye en las copias online y offline. Detalle en `MUSICA.md`.
