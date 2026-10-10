# Arquitectura — online y conservación offline

React 19 + TypeScript + Vite, datos locales y recursos locales. Sin backend para el contenido de recuerdos. La versión pública implementa acceso, cuatro fichas personalizadas, galería de las 41 imágenes, música y descarga offline con originales fotográficos; las demás funciones completas siguen en diseño. Publicación autorizada por Sergi el 10-10-2026.

## Dos entregas desde el mismo contenido

```mermaid
flowchart LR
    O[Originales intactos + SHA-256] --> D[Derivados para consulta]
    C[Catálogo y relatos confirmados] --> R[React + TypeScript]
    D --> R
    R --> W[Vite: edición web]
    R --> F[Bundle clásico: edición offline]
    O --> Z[ZIP de conservación integral]
    D --> Z
    C --> Z
    F --> Z
    W --> V[Vercel: web pública desplegada]
```

El catálogo fotográfico es TypeScript/JSON versionado con IDs estables (`src/data/photos.ts` y `public/media/catalog.json`). La arquitectura editorial futura contempla estas entidades: `Member`, `MediaAsset`, `Episode`, `GroomCase`, `Secret`, `ArchiveManifest`. Los medios conservarán ruta original, SHA-256, ruta derivada, dimensiones, orientación, fecha técnica y fecha editorial con estado `confirmed / approximate / unknown`. Una relación persona/medio tendrá fuente de confirmación; no se deducirá por reconocimiento facial. Separar el texto confirmado de la ficción gráfica.

Los datos se importan al bundle al construir. No usar `fetch()` para leer el catálogo en la edición `file://`. Fotos y vídeos usan rutas relativas. Navegación por hash o estado local, sin rutas que dependan de rewrites de servidor. La app no requiere persistir información para poder consultarse; favoritos/progreso serían mejoras optativas, con acceso a almacenamiento protegido y fallback en memoria.

## Offline duradero

Cambiar únicamente `base: './'` en Vite deja módulos ES que pueden fallar al abrir `file://`. La documentación consultada de [Vite](https://vite.dev/guide/build#relative-base) cubre rutas relativas y [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_classic_scripts) explica las restricciones de módulos locales. Por eso existe una segunda compilación: **JS clásico IIFE, sin imports en tiempo de ejecución, sin carga dividida ni servidor**. `scripts/build-offline.mjs` empaqueta React y sus dependencias con esbuild y copia las 41 fotos, sus originales, retratos, MP3, fuente y CSS a una carpeta autocontenida. Verifica los hashes antes de copiar originales, genera `SHA256SUMS.txt` y una galería estática `GALERIA.html` sin JavaScript. El visor permite abrir el original en otra pestaña; no depende del comportamiento de `download` en enlaces file://.

Entrega final prevista:

```text
LOS-CERDAS-ARCHIVO/
  index.html                 # doble clic; web completa
  app.js + app.css            # bundles precompilados
  media/                     # JPEG/WebP + MP4 compatibles + pósters
  fonts/                     # tipografías y licencias locales
  originales/                # todos los archivos, bytes originales
  catalogo.json              # descripciones y relaciones legibles
  catalogo.csv               # alternativa sencilla para décadas después
  galeria.html               # catálogo estático de respaldo sin React
  fuentes/                   # fuente del proyecto + lockfile + instrucciones
  SHA256SUMS.txt              # originales y derivados, rutas relativas
  LEEME.txt                  # instrucciones humanas y formato de cada carpeta
```

El ZIP se genera en la fase de preparación, nunca comprimiendo cientos de MB en la memoria del navegador. La entrega debe probarse **después de extraer el ZIP**, en carpeta con espacios y otro nombre, sin red, sin caché previa y sin Node. Incluir prueba de controles de vídeo, audio, descarga individual y navegación de las ocho secciones. Los originales se pueden abrir por separado si el frontend deja de funcionar en un navegador futuro.

Conservar formatos comunes ayuda, pero ningún soporte garantiza décadas sin mantenimiento. Copia en disco del novio, otra copia independiente y comprobación periódica de hashes; migrar soporte/formatos cuando haga falta. Conservar siempre los originales además de las conversiones. Un service worker puede mejorar la consulta online después; no es la copia de conservación ni un requisito del ZIP.

## Medios y rendimiento

Generar derivados reproducibles sin modificar originales: WebP + JPEG, miniaturas según resolución real, MP4 H.264 / AAC con `faststart` y orientación normalizada. Mantener 29,97 fps y usar calidad medida; no convertir a 4K medios de baja resolución. Limpiar metadatos de ubicación de los derivados, no de los originales de conservación. Fotografías con `loading="lazy"`, dimensiones reservadas y visor sin filtros de grano. Vídeos con póster, `preload="none"`, `playsInline`, controles y sin autoplay. Música opcional local, pausada al reproducir vídeo.

## Hosting y descarga completa

Según documentación consultada el **10-10-2026**, [Vercel Hobby](https://vercel.com/docs/plans/hobby) ofrece uso personal gratuito y 100 GB de transferencia rápida incluidos. [La subida de fuentes por CLI está limitada a 100 MB](https://vercel.com/docs/limits#static-file-uploads). Este límite de CLI no equivale a un límite universal de tamaño total del archivo ni de salida de una compilación; la misma documentación indica que la salida no tiene ese límite de archivos. La publicación actual por CLI ha terminado correctamente. La incorporación futura de vídeos y ZIP integral requerirá volver a medir el conjunto.

Los originales actuales suman 168,7 MB, por lo que **no caben junto a la app en una subida CLI Hobby sin cambios**. La versión publicada incluye derivados, código y ZIP fotográfico de 34,2 MB: el conjunto subido por CLI es de aproximadamente 42 MB y el despliegue ha terminado correctamente en el proyecto de uso personal. La futura incorporación de vídeos y todos sus originales exige otro presupuesto de tamaño y alojamiento. Una visita que consume 25 MB supone aproximadamente 4.000 visitas dentro de 100 GB, sin contar solicitudes repetidas ni otros recursos; es una estimación de tráfico, no una promesa.

La **descarga integral con originales** es un artefacto aparte, previsiblemente mayor de 168 MB al añadir frontend y derivados. Debe entregarse localmente al novio aunque el alojamiento cambie. Para descargarla también desde la web hay que elegir un alojamiento compatible o un despliegue por Git/build que genere y sirva el ZIP, verificando límites reales, permisos y transferencia. También se pueden ofrecer paquetes de originales por separado con índice; dividir archivos no elimina el límite agregado de una subida CLI. No se propone un botón de descarga integral hasta que el paquete exista y sea accesible.

## Acceso y privacidad

El acceso «clasificado» de la maqueta es teatro. Un código comprobado en JavaScript o un easter egg no protege fotos públicas. Sergi ha autorizado expresamente la web y el repositorio públicos y después la inclusión de todas las imágenes. La publicación actual sirve las 41 fotos y el ZIP con sus originales fotográficos; no hay autenticación. Los MOV originales con ubicación y la grabación musical fuente siguen excluidos del despliegue. Al incorporar otros materiales, aplicar el alcance autorizado para esos contenidos.

No hay cuentas, autenticación, analytics ni servicios externos en ejecución. La web está publicada en https://los-cerdas.vercel.app y su fuente en https://github.com/Kosyalls/los-cerdas. El despliegue se hace con Vercel CLI; la vinculación automática GitHub–Vercel devolvió un error de acceso y no está activa. Detalle en `PUBLICACION.md`. El audio solicitado ya se sirve desde un MP3 local y está incluido en el ZIP offline; procedencia y estado en `MUSICA.md`. La grabación fuente se conserva y verifica aparte del inventario de recuerdos.

## Orden de implementación después de la validación

1. Dirección artística, tono y publicación pública confirmados.
2. Cerrar textos reales, cronología, clasificación de medios y privacidad.
3. Preparar derivados y comprobar peso/calidad.
4. Galería completa ya implementada; fichas personalizadas implementadas; continuar vídeos, cronología y expediente Kili.
5. Música y descarga fotográfica offline incorporadas; continuar sorpresas y descarga integral con vídeos.
6. Construir y verificar ZIP completo offline; añadir respaldo estático y hashes.
7. Revisar con los tres amigos y el dispositivo de entrega; publicar la versión adecuada.

Criterio final de aceptación: mismo contenido autorizado disponible offline sin red; todos los originales conservados y verificables; ninguna sección vacía ni descarga ficticia; hechos confirmados y accesibilidad de teclado/móvil.

## Móvil y escritorio

`src/mobile.css` se importa después de los estilos base y limita todos los ajustes a 850 px. Cabecera persistente, menú nativo modal con foco contenido, bloqueo del fondo, áreas seguras, texto legible y controles de 44–56 px. Galería con 2/3/4 columnas según ancho y visor con disposición horizontal para pantallas bajas. La comparación de ocho capturas de escritorio en 1024/1440/1920 px antes/después de los ajustes móviles resultó idéntica. La incorporación posterior de la galería sí añade navegación y contenido nuevos en escritorio.
