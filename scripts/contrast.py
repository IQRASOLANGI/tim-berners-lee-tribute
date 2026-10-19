#!/usr/bin/env python3
"""WCAG 2.x contrast checker for the colour pairs used in styles.css.

Run:  python scripts/contrast.py
Exit code is 1 if any pair fails its required ratio.
"""
import sys

def lin(c):
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def lum(h):
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(fg, bg):
    a, b = sorted((lum(fg), lum(bg)), reverse=True)
    return (a + 0.05) / (b + 0.05)

def blend(fg, bg, alpha):
    f = fg.lstrip("#"); g = bg.lstrip("#")
    mix = [round(int(f[i:i+2], 16) * alpha + int(g[i:i+2], 16) * (1 - alpha)) for i in (0, 2, 4)]
    return "#%02x%02x%02x" % tuple(mix)

INK, INK_SOFT = "#0a1628", "#12233f"
LIGHT, SLATE, WHITE, INDIGO = "#f5f7fb", "#e4eaf4", "#ffffff", "#1b2a6b"
AZURE_STRONG, CYAN = "#1f55c9", "#22b8cf"

# (label, foreground, background, required ratio)
PAIRS = [
    ("Body text on light",              "#1c2536", LIGHT, 4.5),
    ("Body text on slate",              "#1c2536", SLATE, 4.5),
    ("Muted text on white (cards)",     "#55627a", WHITE, 4.5),
    ("Muted text on light",             "#55627a", LIGHT, 4.5),
    ("Heading ink on light",            INK, LIGHT, 4.5),
    ("Link / year text on white",       AZURE_STRONG, WHITE, 4.5),
    ("Link text on light",              AZURE_STRONG, LIGHT, 4.5),
    ("Link text on slate",              AZURE_STRONG, SLATE, 4.5),
    ("Button label on button",          WHITE, AZURE_STRONG, 4.5),
    ("Nav links on header",             "#dbe5f5", blend(INK, "#000000", 0.94), 4.5),
    ("Hero eyebrow on hero",            CYAN, INK, 4.5),
    ("Hero tagline on hero",            "#8fb4ff", INK, 4.5),
    ("Hero lead on hero",               blend(WHITE, INK, 0.82), INK, 4.5),
    ("Portrait caption on hero",        blend(WHITE, INK_SOFT, 0.75), INK_SOFT, 4.5),
    ("Quote text on indigo",            WHITE, INDIGO, 4.5),
    ("Quote attribution on indigo",     "#9fd9e3", INDIGO, 4.5),
    ("Footer text on ink",              blend(WHITE, INK, 0.82), INK, 4.5),
    ("Footer small text on ink",        blend(WHITE, INK, 0.78), INK, 4.5),
    ("Footer links on ink",             CYAN, INK, 4.5),
    ("Build notes body on ink",         blend(WHITE, INK, 0.82), INK, 4.5),
    ("Build notes links on ink",        CYAN, INK, 4.5),
    ("Build notes headings on ink",     WHITE, INK, 4.5),
    ("Skip link text",                  INK, CYAN, 4.5),
    ("Focus ring on light (UI, 3:1)",   "#1f55c9", LIGHT, 3.0),
    ("Focus ring on ink (UI, 3:1)",     CYAN, INK, 3.0),
]

failed = 0
print(f"{'Pair':38} {'Ratio':>7}  Need  Result")
for label, fg, bg, need in PAIRS:
    r = ratio(fg, bg)
    ok = r >= need
    failed += not ok
    print(f"{label:38} {r:6.2f}:1  {need:>4}  {'PASS' if ok else 'FAIL'}")
sys.exit(1 if failed else 0)
