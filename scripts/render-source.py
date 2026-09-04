#!/usr/bin/env python3
"""
Regenerate the source-material artefacts from the Margomulyo concept PDF.

The PDF itself is not committed (181 MB) — only its SHA-256 in
docs/source/CHECKSUMS.txt and the extracted text. This script rebuilds the
page renders that docs/DESIGN_REFERENCE.md and docs/SOURCE_DATA.md cite, so
any reviewer can reproduce the visual ground truth.

Usage:
    python scripts/render-source.py [path/to/Data Konsep Web Desa Margomulyo.pdf]

Defaults to docs/source/Data Konsep Web Desa Margomulyo.pdf.
Requires: pymupdf  (pip install pymupdf)
"""

import hashlib
import pathlib
import sys

try:
    import pymupdf
except ImportError:
    sys.exit("pymupdf is required:  pip install pymupdf")

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "docs" / "source"
DEFAULT_PDF = SOURCE_DIR / "Data Konsep Web Desa Margomulyo.pdf"
RENDER_DIR = SOURCE_DIR / "renders"

# Expected checksum — a mismatch means the source material changed and
# docs/SOURCE_DATA.md must be re-verified before any content ships.
EXPECTED_SHA256 = "2a9afdbb5d5db1946c3e2c71f2f881551f01b95c627cc8c85f11142016a4435e"

# Pages are full-height desktop captures (1280 x 3754-7781 px). Slicing keeps
# each render legible when read back for verification.
SLICE_HEIGHT = 1500
PAGE_WIDTH = 1280

PAGE_NAMES = {
    1: "beranda",
    2: "profil",
    3: "pemerintahan",
    4: "berita",
    5: "layanan",
    6: "transparansi",
    7: "kontak",
    8: "potensi",
    9: "umkm-tempe-mbok-sri",
}


def sha256(path: pathlib.Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    pdf_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PDF
    if not pdf_path.exists():
        sys.exit(
            f"Source PDF not found at {pdf_path}\n"
            "It is intentionally not committed. Restore it from the kalurahan "
            "archive, then re-run."
        )

    digest = sha256(pdf_path)
    if digest != EXPECTED_SHA256:
        print(f"WARNING: checksum mismatch\n  expected {EXPECTED_SHA256}\n  got      {digest}")
        print("docs/SOURCE_DATA.md must be re-verified against this file before content ships.\n")
    else:
        print(f"checksum OK  {digest[:16]}...")

    RENDER_DIR.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(pdf_path)

    text_parts = []
    slice_count = 0

    for index, page in enumerate(doc):
        number = index + 1
        name = PAGE_NAMES.get(number, f"page-{number}")
        text = page.get_text() or ""
        text_parts.append(f"===== PAGE {number} — {name} =====\n{text}")

        height = page.rect.height
        top = 0
        part = 0
        while top < height:
            clip = pymupdf.Rect(0, top, PAGE_WIDTH, min(top + SLICE_HEIGHT, height))
            out = RENDER_DIR / f"p{number:02d}-{name}-{part:02d}.png"
            page.get_pixmap(clip=clip, dpi=72).save(out)
            top += SLICE_HEIGHT
            part += 1
            slice_count += 1

        print(f"  page {number:>2} {name:<22} {page.rect.width:.0f}x{height:.0f}px -> {part} slices")

    (SOURCE_DIR / "extracted-text.txt").write_text("\n".join(text_parts), encoding="utf-8")

    print(f"\n{slice_count} renders in {RENDER_DIR}")
    print(f"extracted text in {SOURCE_DIR / 'extracted-text.txt'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
