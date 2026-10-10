#!/usr/bin/env python3
"""Build local image copies and a catalog without changing original media."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
known = {
    'LC-001': ('Cuatro amigos alrededor de una mesa con un recipiente y pajitas.', 'FOTOGRAFÍA DE GRUPO'),
    'LC-008': ('Foto de grupo junto a una hoguera de noche.', 'PRUEBA NOCTURNA'),
    'LC-022': ('Tres amigos se fotografían en una playa.', 'REGISTRO EN LA PLAYA'),
    'LC-019': ('Tres amigos posan juntos en un local.', 'FOTOGRAFÍA DE GRUPO'),
    'LC-023': ('Tres amigos con gafas de sol dentro de un coche.', 'REGISTRO EN EL COCHE'),
    'LC-026': ('Varios amigos posan en una foto vertical dentro de un local.', 'FOTOGRAFÍA DE GRUPO'),
    'LC-043': ('De izquierda a derecha, Kili, Coco, Jowi y Luizao, según la identificación confirmada por Sergi.', 'LOS CUATRO / IDENTIDAD CONFIRMADA'),
}
inventory = json.loads((ROOT / 'docs/audit/inventory.json').read_text())
photos = []
for item in sorted(inventory['files'], key=lambda i: i['id']):
    if item['kind'] != 'image':
        continue
    source = ROOT / item['original_path']
    assert hashlib.sha256(source.read_bytes()).hexdigest() == item['sha256'], f'Changed original: {source.name}'
    target = ROOT / 'public/media' / (item['id'] + '.jpg')
    if not target.exists():
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert('RGBA')
            matte = Image.new('RGBA', image.size, '#e9e5db')
            matte.alpha_composite(image)
            image = matte.convert('RGB')
            image.thumbnail((1600, 1600))
            image.save(target, quality=90, optimize=True, progressive=True)
    with Image.open(target) as image:
        width, height = image.size
    description, label = known.get(item['id'], (f'Fotografía del archivo Los Cerdas, prueba {item["id"]}.', 'PRUEBA FOTOGRÁFICA'))
    photos.append({'id': item['id'], 'text': description, 'label': label,
                   'width': width, 'height': height, 'originalFile': item['original_path'],
                   'originalSha256': item['sha256'], 'src': f'./media/{item["id"]}.jpg'})
assert len(photos) == inventory['summary']['formats']['.png'] + inventory['summary']['formats']['.jpg']
(ROOT / 'src/data/photos.ts').write_text('export type Photo = { id: string; text: string; label: string; width: number; height: number; originalFile: string; originalSha256: string; src: string };\n\nexport const photos: Photo[] = ' + json.dumps(photos, ensure_ascii=False, indent=2) + ';\n')
(ROOT / 'public/media/catalog.json').write_text(json.dumps({'date': '2026-10-10', 'imageCount': len(photos), 'photos': photos}, ensure_ascii=False, indent=2) + '\n')
print(f'{len(photos)} photos prepared; {sum((ROOT / p["src"].removeprefix("./").replace("media/", "public/media/", 1)).stat().st_size for p in photos):,} bytes in JPEG copies. Existing approved images retained.')
