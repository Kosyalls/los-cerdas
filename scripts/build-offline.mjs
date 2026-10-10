import { build } from "esbuild";
import { copyFile, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "offline-preview");
await mkdir(out, { recursive: true });
const catalog = JSON.parse(
  await readFile(path.join(root, "public/media/catalog.json"), "utf8"),
);
await mkdir(path.join(out, "originales"), { recursive: true });
const sums = [];
for (const photo of catalog.photos) {
  const source = path.join(root, photo.originalFile);
  const bytes = await readFile(source);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (hash !== photo.originalSha256)
    throw new Error(`Original changed: ${photo.originalFile}`);
  await copyFile(source, path.join(out, "originales", photo.originalFile));
  sums.push(`${hash}  originales/${photo.originalFile}`);
}
await writeFile(path.join(out, "SHA256SUMS.txt"), sums.join("\n") + "\n");
await build({
  entryPoints: [path.join(root, "src/main.tsx")],
  outfile: path.join(out, "app.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  external: ["/fonts/*"],
  legalComments: "eof",
});
const css = (await readFile(path.join(out, "app.css"), "utf8")).replaceAll(
  "/fonts/",
  "./fonts/",
);
await writeFile(path.join(out, "app.css"), css);
await cp(path.join(root, "public/media"), path.join(out, "media"), {
  recursive: true,
});
await cp(path.join(root, "public/fonts"), path.join(out, "fonts"), {
  recursive: true,
});
await copyFile(
  path.join(root, "public/favicon.svg"),
  path.join(out, "favicon.svg"),
);
await writeFile(
  path.join(out, "index.html"),
  `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#111110"><meta name="robots" content="noindex,nofollow"><title>LOS CERDAS — Archivo offline</title><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./app.css"></head><body><div id="root"></div><script defer src="./app.js"></script></body></html>\n`,
);
await writeFile(
  path.join(out, "LEEME.txt"),
  `LOS CERDAS / MAQUETA DE DIRECCIÓN ARTÍSTICA / 2026-10-10

1. Extrae todo el ZIP en una carpeta.
2. Abre index.html con doble clic en un navegador moderno.
3. No necesitas Internet, cuentas, Node, npm ni un servidor.

Esta copia incluye las ${catalog.imageCount} imágenes, sus ${catalog.imageCount} originales sin modificar, cuatro retratos y una galería navegable.
Abre GALERIA.html si prefieres consultar todas las fotos sin JavaScript.
El catálogo está en media/catalog.json y los hashes originales en SHA256SUMS.txt.
Incluye Soviet Connection (Michael Hunter) como MP3 local, convertido de la grabación aportada por Sergi.
El tema comienza al pulsar abrir el archivo, con volumen bajo. El botón de sonido permite silenciarlo o activarlo.
Las demás secciones explican el diseño previsto; no son funciones terminadas.
Los originales de las imágenes están en originales/; los dos vídeos quedan para la siguiente fase.
La entrega final incorporará también los vídeos, relatos y demás secciones completas.

Contenido real, fechas e identidades: solo lo confirmado por los amigos.
Fuente Anton incluida bajo OFL; licencia en fonts/OFL.txt.
Conserva la carpeta completa. No muevas index.html por separado.
`,
);
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const figures = catalog.photos
  .map(
    (photo) =>
      `<figure><a href="./originales/${encodeURIComponent(photo.originalFile)}" target="_blank" rel="noopener"><img src="${escape(photo.src)}" alt="${escape(photo.text)}" loading="lazy" width="${photo.width}" height="${photo.height}"></a><figcaption>${escape(photo.id)} · <a href="./originales/${encodeURIComponent(photo.originalFile)}" target="_blank" rel="noopener">Abrir original</a></figcaption></figure>`,
  )
  .join("\n");
await writeFile(
  path.join(out, "GALERIA.html"),
  `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LOS CERDAS — Todas las imágenes</title><style>body{font:16px Arial;background:#111110;color:#e9e5db;margin:24px}h1{color:#ff494b}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px}figure{margin:0;padding:12px;border:1px solid #666}img{width:100%;height:260px;object-fit:contain}a{color:inherit}figcaption{padding-top:12px;line-height:1.5}</style><h1>LOS CERDAS / ${catalog.imageCount} IMÁGENES</h1><p>Galería local de conservación. Cada foto enlaza a su original intacto.</p><p><a href="./index.html">Abrir el archivo interactivo</a></p><main>${figures}</main></html>\n`,
);
console.log(
  "Offline prototype built: offline-preview/index.html (classic bundled JS; no server required).",
);
