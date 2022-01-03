import vision from "@google-cloud/vision";

class ImageRecognizer {
  constructor() {}

  public static async recognize(filePath: string) {
    try {
      if (!filePath) throw "should provide a valid path";

      const features = [
        {
          type: "IMAGE_PROPERTIES",
          maxResults: 1,
        },
        {
          type: "LABEL_DETECTION",
          maxResults: 5,
        },
        {
          type: "LOGO_DETECTION",
          maxResults: 1,
        },
        {
          type: "OBJECT_LOCALIZATION",
          maxResults: 5,
        },
      ];

      const client = new vision.ImageAnnotatorClient();

      const [result] = await client.annotateImage({
        image: { source: { filename: filePath } },
        features,
      });

      return result;
    } catch (error) {
      throw new Error(
        `Something went wrong at ImageRecognize.recognize(), error: ${error}`
      );
    }
  }
}

export { ImageRecognizer };
