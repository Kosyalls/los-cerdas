# LOS CERDAS — El archivo clasificado

Dirección artística base **aprobada por Sergi el 10-10-2026** («me encanta»). Segunda revisión con sangre gráfica, casquillos, impactos, cinta policial y estrellas. La aplicación completa todavía no está implementada ni publicada.

## Revisar la maqueta

```sh
npm install
npm run dev
```

Abre `http://127.0.0.1:5173`. Hay una pantalla de acceso, vista general del expediente, retratos confirmados, siete fotografías de muestra ampliables y un índice que explica las secciones previstas. React + TypeScript + Vite; no hay datos ficticios de aventuras. Soviet Connection comienza al abrir el expediente, a volumen bajo, y el botón de sonido permite silenciarlo o activarlo. El MP3 está en `public/media/soviet-connection.mp3`.

## Abrir sin Internet

Abre `offline-preview/index.html` con doble clic, o extrae `public/downloads/los-cerdas-maqueta-offline.zip` y abre su `index.html`. La maqueta offline incluye siete fotos, cuatro retratos y el tema MP3 local; **no es todavía el archivo completo de recuerdos**.

```sh
npm run package:prototype
```

Genera la versión Vite, una versión offline con JavaScript clásico empaquetado y el ZIP. Todos los recursos se cargan de la carpeta local; no necesita Node ni servidor para consultarse.

## Documentación

- [Auditoría de los originales](docs/AUDITORIA.md)
- [Dirección artística y recorrido](docs/DIRECCION-ARTISTICA.md)
- [Arquitectura y conservación offline](docs/ARQUITECTURA.md)
- [Contenido confirmado y plantilla editorial](docs/CONTENIDO.md)
- [Música de GTA IV: fuentes y estado](docs/MUSICA.md)
- [Validación de esta fase](docs/VALIDACION.md)
- [Inventario completo y SHA-256](docs/audit/inventory.json)

## Conservación

Los originales permanecen en la raíz con sus nombres y bytes originales. El inventario asigna IDs persistentes. Las miniaturas, los retratos y los fotogramas se guardan aparte.

```sh
npm run audit:media
npm run verify:originals
npm run typecheck
npm run build
```

La auditoría requiere Python con Pillow y FFmpeg/FFprobe. El script de verificación SHA-256 solo necesita Python. El navegador final no necesita esas herramientas. Node para desarrollar: 22.12 o superior.

## Siguiente fase

Con la dirección base aprobada y la música incorporada, cerrar contexto real, fechas, historias y privacidad, y construir el archivo completo con todos los medios y la entrega offline integral. No se han subido fotos ni vídeos a servicios externos.
