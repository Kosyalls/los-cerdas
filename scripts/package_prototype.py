#!/usr/bin/env python3
from pathlib import Path
import zipfile
import shutil

root = Path(__file__).resolve().parents[1]
source = root / 'offline-preview'
target = root / 'public' / 'downloads' / 'los-cerdas-maqueta-offline.zip'
target.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(source.rglob('*')):
        if file.is_file():
            archive.write(file, str(Path('LOS-CERDAS-MAQUETA') / file.relative_to(source)))
with zipfile.ZipFile(target) as archive:
    assert archive.testzip() is None, 'Invalid ZIP'
dist_downloads = root / 'dist' / 'downloads'
dist_downloads.mkdir(parents=True, exist_ok=True)
shutil.copyfile(target, dist_downloads / target.name)
print(f'Prototype ZIP: {target.relative_to(root)} / {target.stat().st_size:,} bytes / CRC verified')
