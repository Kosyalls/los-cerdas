# Publicación pública — 10-10-2026

Sergi autorizó explícitamente: «subela a github y a vercel, hazlo publico». Después pidió mejorar móvil sin cambiar PC e incluir todas las imágenes.

- Web: https://los-cerdas.vercel.app
- GitHub público: https://github.com/Kosyalls/los-cerdas, rama `main`.
- ZIP: https://los-cerdas.vercel.app/downloads/los-cerdas-maqueta-offline.zip
- Vercel: proyecto `los-cerdas`, equipo `kosys-projects`.

La versión inicial se publicó correctamente mediante Vercel CLI. La actualización incluye las 41 imágenes, la galería navegable, ajustes móviles y un ZIP de 34,2 MB con los 41 originales fotográficos. Las comprobaciones de producción son anónimas: página, assets, recursos y descarga sin sesión iniciada; el ZIP remoto debe coincidir con el artefacto local por SHA-256.

## Actualizar la web

```sh
npm ci
npm run build
git add .
git commit -m "Describe el cambio"
git push origin main
vercel deploy --prod --yes --scope kosys-projects --logs
```

Si cambia el contenido de la copia offline, regenerar primero `npm run package:prototype` con los originales fotográficos disponibles en la raíz. Revisar los archivos preparados antes del commit: el ZIP es público y contiene originales fotográficos deliberadamente.

La **vinculación automática GitHub–Vercel no está activa**: Vercel devolvió un error de acceso al intentar conectarla. Los pushes a GitHub no publican por sí solos; se ha desplegado con CLI. La web pública funciona y no requiere esa integración para mantenerse.

No almacenar tokens en el repositorio. `.vercel/`, `.env*`, fuentes multimedia originales de la raíz, builds y evidencias locales están excluidos. `.vercelignore` también excluye una carpeta que se extrajo localmente de un ZIP previo bajo `public/downloads/LOS-CERDAS-MAQUETA/`; no se publica esa copia antigua.

## Contenido publicado

Las 41 copias fotográficas suman 3,06 MB. La fuente, el MP3 local, los retratos, el código y el ZIP fotográfico permiten una subida CLI de aproximadamente 42 MB. Los MOV originales de recuerdos y la grabación musical fuente permanecen locales. La próxima fase con vídeos exige volver a medir el conjunto y escoger cómo alojar el ZIP integral.

El acceso «clasificado» es una entrada teatral: el usuario ha solicitado contenido público, sin autenticación. No hay analytics ni servicios externos necesarios para consultar la copia offline. Se conserva `noindex,nofollow` como preferencia de indexación, sin convertirlo en un control de acceso.

La procedencia musical está registrada en `MUSICA.md`; el usuario declara haber comprado la licencia y el documento no se ha verificado. No se ha comprado ni descargado otra grabación.
