# LOS CERDAS — El archivo clasificado

Dirección artística base **aprobada por Sergi el 10-10-2026** («me encanta»). Revisión GTA con sangre gráfica, casquillos, impactos, cinta policial y estrellas. Publicación pública autorizada por Sergi: la versión actual incluye **las 41 imágenes**, música y copia offline con los originales fotográficos. Los vídeos, la cronología, los secretos y el expediente especial completo siguen pendientes.

- [Web pública](https://los-cerdas.vercel.app)
- [Repositorio público](https://github.com/Kosyalls/los-cerdas)
- [Descarga offline con las 41 fotos originales — 34,2 MB](https://los-cerdas.vercel.app/downloads/los-cerdas-maqueta-offline.zip)

## Revisar la maqueta

```sh
npm install
npm run dev
```

Abre `http://127.0.0.1:5173`. Hay una pantalla de acceso, vista general del expediente, cuatro fichas individuales con los textos de Sergi, retratos confirmados y galería de las 41 fotografías: filtros por orientación, ampliación y navegación anterior/siguiente, también con flechas de teclado. El botón «VER LAS 41 FOTOS» abre la galería desde el inicio del expediente. El índice de sospechosos y cada retrato abren las fichas personalizadas; el resto del índice explica las secciones previstas. React + TypeScript + Vite; no hay datos ficticios de aventuras. Soviet Connection comienza al abrir el expediente, a volumen bajo, y el botón de sonido permite silenciarlo o activarlo. El MP3 está en `public/media/soviet-connection.mp3`.

El móvil tiene navegación modal, cabecera accesible al desplazarse, controles táctiles grandes y visor adaptado a vertical/horizontal. Los ajustes de `src/mobile.css` están limitados a pantallas de hasta 850 px; se comprobó que no cambian el diseño de escritorio.

## Abrir sin Internet

Extrae `public/downloads/los-cerdas-maqueta-offline.zip` y abre su `index.html` con doble clic. Incluye las 41 fotos de consulta, **los 41 originales intactos**, cuatro retratos, MP3, fuente local, catálogo y `SHA256SUMS.txt`. `GALERIA.html` permite consultar las fotos sin JavaScript. El visor abre cada original en otra pestaña sin abandonar el expediente. **Los dos vídeos aún no están incluidos.**

```sh
npm run package:prototype
```

Genera la versión Vite, una versión offline con JavaScript clásico empaquetado y el ZIP. Todos los recursos se cargan de la carpeta local; no necesita Node ni servidor para consultarse. Este comando de desarrollo requiere los originales fotográficos en la raíz; al clonar el repositorio, se pueden recuperar de la carpeta `originales/` del ZIP. Para regenerar las copias y el catálogo: `npm run prepare:photos` (Python + Pillow).

## Documentación

- [Auditoría de los originales](docs/AUDITORIA.md)
- [Dirección artística y recorrido](docs/DIRECCION-ARTISTICA.md)
- [Arquitectura y conservación offline](docs/ARQUITECTURA.md)
- [Contenido confirmado y plantilla editorial](docs/CONTENIDO.md)
- [Música de GTA IV: fuentes y estado](docs/MUSICA.md)
- [Validación de esta fase](docs/VALIDACION.md)
- [Publicación y mantenimiento](docs/PUBLICACION.md)
- [Inventario completo y SHA-256](docs/audit/inventory.json)

## Conservación

Los originales permanecen en la raíz con sus nombres y bytes originales. El inventario asigna IDs persistentes. Las miniaturas, los retratos y los fotogramas se guardan aparte. Git excluye las fuentes originales de la raíz; los 41 originales fotográficos se distribuyen dentro del ZIP público solicitado. Los MOV originales permanecen locales.

```sh
npm run audit:media
npm run verify:originals
npm run typecheck
npm run build
```

La auditoría requiere Python con Pillow y FFmpeg/FFprobe. El script de verificación SHA-256 solo necesita Python. El navegador final no necesita esas herramientas. Node para desarrollar: 22.12 o superior.

## Siguiente fase

Con la dirección base aprobada, las fotos y la música publicadas, cerrar contexto real, fechas e historias, incorporar los dos vídeos y construir el resto de las secciones y la entrega offline integral.
