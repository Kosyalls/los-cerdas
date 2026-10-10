#!/usr/bin/env python3
"""Read-only audit of original media in the project root; outputs under docs/audit."""
from pathlib import Path
from collections import Counter, defaultdict
import hashlib
import json
import subprocess
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'audit'
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.heic', '.webp', '.gif', '.mov', '.mp4', '.m4v'}


def sha256(path):
    h = hashlib.sha256()
    with path.open('rb') as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def sheet(items, output, columns=4):
    cell_w, cell_h = 320, 240
    canvas = Image.new('RGB', (columns * cell_w, ((len(items) + columns - 1) // columns) * cell_h), '#161616')
    draw = ImageDraw.Draw(canvas)
    for i, (path, label) in enumerate(items):
        with Image.open(path) as image:
            preview = ImageOps.contain(ImageOps.exif_transpose(image).convert('RGB'), (cell_w - 16, cell_h - 40))
        x, y = (i % columns) * cell_w, (i // columns) * cell_h
        canvas.paste(preview, (x + (cell_w - preview.width) // 2, y + 8))
        draw.text((x + 10, y + cell_h - 26), label, fill='#efede6')
    canvas.save(output, quality=90)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    thumbs = OUT / 'thumbnails'
    thumbs.mkdir(exist_ok=True)
    # The supplied soundtrack recording is a production resource, not a group memory.
    soundtrack = json.loads((OUT / 'soundtrack.json').read_text()) if (OUT / 'soundtrack.json').exists() else None
    excluded = {soundtrack['source']['original_path']} if soundtrack else set()
    files = sorted(p for p in ROOT.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS and p.name not in excluded)
    old_inventory = json.loads((OUT / 'inventory.json').read_text()) if (OUT / 'inventory.json').exists() else {'files': []}
    old_by_path = {r['original_path']: r for r in old_inventory['files']}
    next_id = max([int(r['id'].split('-')[1]) for r in old_inventory['files']] + [0]) + 1
    records, images, frames = [], [], []
    for path in files:
        if path.name in old_by_path:
            media_id = old_by_path[path.name]['id']
            if sha256(path) != old_by_path[path.name]['sha256']:
                raise RuntimeError(f'Original changed since previous audit: {path.name}')
        else:
            media_id = f'LC-{next_id:03}'
            next_id += 1
        record = {'id': media_id, 'original_path': path.name, 'bytes': path.stat().st_size,
                  'sha256': sha256(path), 'extension': path.suffix.lower(), 'errors': []}
        try:
            if path.suffix.lower() in {'.mov', '.mp4', '.m4v'}:
                record['kind'] = 'video'
                probe = subprocess.run(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(path)], capture_output=True, text=True, check=True)
                data = json.loads(probe.stdout)
                record['duration_seconds'] = float(data['format']['duration'])
                record['container'] = data['format']['format_name']
                record['bit_rate'] = int(data['format'].get('bit_rate', 0))
                # GPS coordinates and device serials are intentionally excluded.
                record['creation_time'] = data['format'].get('tags', {}).get('creation_time')
                record['has_location_metadata'] = any('location' in key.lower() for key in data['format'].get('tags', {}))
                record['streams'] = []
                for stream in data['streams']:
                    if stream['codec_type'] in {'video', 'audio'}:
                        keep = {k: stream[k] for k in ['codec_type', 'codec_name', 'width', 'height', 'r_frame_rate', 'pix_fmt', 'sample_rate', 'channels'] if k in stream}
                        keep['rotation'] = next((x.get('rotation') for x in stream.get('side_data_list', []) if 'rotation' in x), None)
                        record['streams'].append(keep)
                for n, fraction in enumerate([0.12, 0.5, 0.85], 1):
                    target = thumbs / f'{media_id}-frame-{n}.jpg'
                    time = record['duration_seconds'] * fraction
                    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(time), '-i', str(path), '-frames:v', '1', '-vf', 'scale=640:640:force_original_aspect_ratio=decrease', str(target)], capture_output=True, check=True)
                    frames.append((target, f'{media_id} / {time:.1f}s'))
            else:
                record['kind'] = 'image'
                with Image.open(path) as image:
                    record.update({'format': image.format, 'width': image.width, 'height': image.height, 'mode': image.mode})
                    exif = image.getexif()
                    record['exif_date'] = exif.get(36867) or exif.get(306)
                    record['has_location_metadata'] = 34853 in exif
                    image.verify()
                with Image.open(path) as image:
                    normal = ImageOps.exif_transpose(image).convert('RGB')
                    normal.thumbnail((640, 640))
                    target = thumbs / f'{media_id}.jpg'
                    normal.save(target, quality=88)
                    small = normal.convert('L').resize((9, 8))
                    pixels = list(small.getdata())
                    bits = [pixels[y * 9 + x] > pixels[y * 9 + x + 1] for y in range(8) for x in range(8)]
                    record['dhash'] = f'{sum(int(bit) << j for j, bit in enumerate(bits)):016x}'
                    images.append((target, f'{media_id} / {record["width"]}x{record["height"]}'))
        except Exception as error:
            record['errors'].append(str(error))
        records.append(record)
    for i in range(0, len(images), 12):
        sheet(images[i:i + 12], OUT / f'contact-images-{i // 12 + 1}.jpg')
    if frames:
        sheet(frames, OUT / 'contact-videos.jpg', columns=3)
    duplicates = defaultdict(list)
    for record in records:
        duplicates[record['sha256']].append(record['id'])
    similar = []
    for i, first in enumerate(records):
        if 'dhash' not in first:
            continue
        for second in records[i + 1:]:
            if 'dhash' in second:
                distance = bin(int(first['dhash'], 16) ^ int(second['dhash'], 16)).count('1')
                if distance <= 6:
                    similar.append({'ids': [first['id'], second['id']], 'distance': distance, 'status': 'candidate; requires visual confirmation'})
    summary = {'audit_date': '2026-10-10', 'root': str(ROOT), 'total_files': len(records),
               'total_bytes': sum(r['bytes'] for r in records), 'formats': dict(Counter(r['extension'] for r in records)),
               'image_bytes': sum(r['bytes'] for r in records if r['kind'] == 'image'),
               'video_bytes': sum(r['bytes'] for r in records if r['kind'] == 'video'),
               'duration_seconds': sum(r.get('duration_seconds', 0) for r in records),
               'exact_duplicate_groups': [v for v in duplicates.values() if len(v) > 1],
               'similar_image_candidates': similar,
               'errors': [r['id'] for r in records if r['errors']]}
    (OUT / 'inventory.json').write_text(json.dumps({'summary': summary, 'files': records}, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    for record in records:
        print(record['id'], record['original_path'], {k: record[k] for k in ['width', 'height', 'exif_date', 'creation_time', 'duration_seconds', 'streams', 'has_location_metadata'] if k in record})


if __name__ == '__main__':
    main()
