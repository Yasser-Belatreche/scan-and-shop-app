import { google } from "@google-cloud/vision/build/protos/protos";

class CloudVisionResultParser {
  private response: google.cloud.vision.v1.IAnnotateImageResponse;

  constructor(response: google.cloud.vision.v1.IAnnotateImageResponse) {
    this.response = response;
  }

  public parseDominantColor() {
    const colors =
      this.response.imagePropertiesAnnotation?.dominantColors?.colors;

    if (!colors || !colors[0]?.color) return { rgb: null, hex: null };

    const { red, green, blue } = colors[0].color;

    if (!red || !green || !blue) return { rgb: null, hex: null };

    const rgb = `rgb(${red}, ${green}, ${blue})`;
    const hex = `#${this.getHex(red)}${this.getHex(green)}${this.getHex(blue)}`;

    return { rgb, hex };
  }

  public parseLogo(): string | null {
    const logos = this.response.logoAnnotations;

    if (!logos?.length || !logos[0].description) return null;

    return logos[0].description;
  }

  public parseProduct(): string | null {
    const logos = this.response.localizedObjectAnnotations;

    if (!logos?.length || !logos[0].name) return null;

    return logos[0].name;
  }

  public parseDescriptiveLabel(): string | null {
    const logos = this.response.labelAnnotations;

    if (!logos?.length || !logos[0].description) return null;

    return logos[0].description;
  }

  private getHex(decimalValue: number): string {
    const hex = decimalValue.toString(16);

    if (hex.length === 1) return `0${hex}`;
    else return hex;
  }
}

export { CloudVisionResultParser };
