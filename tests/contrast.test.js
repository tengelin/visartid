import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

function parseCssCustomProperties(css) {
  const props = {};
  let match;
  const re = /--([a-z-]+):\s*([^;]+)/g;
  while ((match = re.exec(css)) !== null) {
    props[match[1]] = match[2].trim();
  }
  return props;
}

function parseColor(str) {
  const rgbMatch = str.match(/rgb\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*\)/);
  if (rgbMatch) {
    return [ parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]) ];
  }
  let hex = str.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return [ parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16) ];
}

function relativeLuminance(rgb) {
  const channels = rgb.map((c) => {
    const srgb = c / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const testDir = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(testDir, '../styles/main.css'), 'utf8');
const props = parseCssCustomProperties(css);
const white = [ 255, 255, 255 ];

describe('WCAG contrast math', () => {
  it('black vs white should be 21:1', () => {
    const ratio = contrastRatio([ 0, 0, 0 ], white);
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('white vs white should be 1:1', () => {
    const ratio = contrastRatio(white, white);
    expect(ratio).toBeCloseTo(1, 0);
  });
});

describe('CSS custom properties are parseable', () => {
  it('should find all expected button color variables', () => {
    const expected = [
      'color-green', 'color-green-hover', 'color-green-active',
      'color-steel', 'color-steel-hover', 'color-steel-active',
      'color-gray', 'color-gray-hover', 'color-gray-active',
    ];
    expected.forEach((name) => {
      expect(props).toHaveProperty(name);
    });
  });
});

describe('WCAG AA contrast — buttons with white text', () => {
  const buttonColorVars = [
    'color-green', 'color-green-hover', 'color-green-active',
    'color-steel', 'color-steel-hover', 'color-steel-active',
    'color-gray', 'color-gray-hover', 'color-gray-active',
  ];

  buttonColorVars.forEach((name) => {
    it(`--${  name  } (${  props[name]  }) vs white meets 4.5:1`, () => {
      const bg = parseColor(props[name]);
      const ratio = contrastRatio(bg, white);
      expect(ratio, `--${  name  } contrast is ${  ratio.toFixed(2)  }:1`).toBeGreaterThanOrEqual(4.5);
    });
  });
});

