export default class Favicon {
  constructor(img) {
    this.imageData = this.getImageData(img);
    this.dominantColor = null;
    if (this.imageData) {
      this.pixelCount = this.imageData.length / 4;
      this.transparentPixelCount = 0;
      this.colorMap = this.mapColors();
      this.dominantColor = this.getDominantColor();
    }
  }

  getImageData(img) {
    // Returns an ImageData instance representing the raw image data for the
    // image passed to the constructor. getImageData is subject to the same
    // origin policy, so we should gracefully fail if it's an external image.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    try {
      context.drawImage(img, 0, 0);
      return context.getImageData(0, 0, img.width, img.height).data;
    } catch (err) {
      return null;
    }
  }

  getColorAtPosition(position) {
    const color = {
      r: this.imageData[position],
      g: this.imageData[position + 1],
      b: this.imageData[position + 2],
      alpha: (this.imageData[position + 3] / 255)
    };
    color.rgb = [color.r, color.g, color.b].join(', ');
    return color;
  }

  mapColors() {
    // Sample the color of each pixel in the image, storing a count of
    // transparent (alpha <= 0.5) pixels and a frequency map of each
    // non-transparent color.
    const colorMap = {};
    for (let i = 0; i < this.pixelCount; i++) {
      const color = this.getColorAtPosition(i * 4);
      if (color.alpha <= 0.5) {
        ++this.transparentPixelCount;
      } else {
        colorMap[color.rgb] = ((color.rgb in colorMap) ?
                               colorMap[color.rgb] + 1 : 1);
      }
    }
    return colorMap;
  }

  getDominantColor() {
    // If at least half the pixels in the image are not transparent, return the
    // most common color in the map.
    if (this.transparentPixelCount > this.pixelCount / 2) {
      return null;
    }
    let maxColor;
    let maxCount = 0;
    for (const color in this.colorMap) {
      if (color !== '255, 255, 255' && this.colorMap[color] > maxCount) {
        ++maxCount;
        maxColor = color;
      }
    }
    return 'rgb(' + maxColor + ')';
  }
}
