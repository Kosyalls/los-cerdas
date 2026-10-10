#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[1]
inventory = json.loads((root / 'docs/audit/inventory.json').read_text())
errors = []
sources = inventory['files'][:]
soundtrack_path = root / 'docs/audit/soundtrack.json'
if soundtrack_path.exists():
    sources.append(json.loads(soundtrack_path.read_text())['source'])
for item in sources:
    source = root / item['original_path']
    if not source.exists():
        errors.append(item['original_path'] + ': missing')
        continue
    hash_value = hashlib.sha256()
    with source.open('rb') as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b''):
            hash_value.update(chunk)
    if hash_value.hexdigest() != item['sha256']:
        errors.append(item['original_path'] + ': SHA-256 differs')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'{len(sources)} originals verified against SHA-256 records ({len(inventory["files"])} memories + {len(sources) - len(inventory["files"])} soundtrack sources); no changes.')
