import { expect } from "chai";

import { CloudVisionResultParser } from "./CloudVisionResultParser";

describe("CloudVisionResultParser class", () => {
  describe("parseDominantColor() method", () => {
    it("should return an object contains rgb and hex values of the colors in the result object", () => {
      const result: any = {
        imagePropertiesAnnotation: {
          dominantColors: {
            colors: [
              {
                color: {
                  red: 10,
                  green: 18,
                  blue: 255,
                },
              },
            ],
          },
        },
      };

      const resultParser = new CloudVisionResultParser(result);
      const dominantColors = resultParser.parseDominantColor();

      expect(dominantColors).to.have.property("rgb", "rgb(10, 18, 255)");
      expect(dominantColors).to.have.property("hex", "#0a12ff");
    });

    it("should return an object contains rgb and hex properties with null value when no colors in the result", () => {
      const result: any = {
        imagePropertiesAnnotation: {
          dominantColors: {},
        },
      };

      const resultParser = new CloudVisionResultParser(result);
      const dominantColors = resultParser.parseDominantColor();

      expect(dominantColors).to.have.property("rgb").to.be.null;
      expect(dominantColors).to.have.property("hex").to.be.null;
    });

    it("should return an object contains rgb and hex properties with null value when on of the colors provided is undefined", () => {
      const result: any = {
        imagePropertiesAnnotation: {
          dominantColors: {
            colors: [
              {
                color: {
                  red: undefined,
                  green: 18,
                  blue: 255,
                },
              },
            ],
          },
        },
      };

      const resultParser = new CloudVisionResultParser(result);
      const dominantColors = resultParser.parseDominantColor();

      expect(dominantColors).to.have.property("rgb").to.be.null;
      expect(dominantColors).to.have.property("hex").to.be.null;
    });
  });

  describe("parseLogo() method", () => {
    it("should return the logo name if exist in the result object", () => {
      const result: any = {
        logoAnnotations: [
          {
            description: "Lenovo",
          },
        ],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseLogo();

      expect(logo).to.be.a("string").to.equal("Lenovo");
    });

    it("should return null when no logo exist in the result object", () => {
      const result: any = {
        logoAnnotations: [],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseLogo();

      expect(logo).to.be.null;
    });
  });

  describe("parseProduct() method", () => {
    it("should return the logo name if exist in the result object", () => {
      const result: any = {
        localizedObjectAnnotations: [
          {
            name: "Laptop",
          },
        ],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseProduct();

      expect(logo).to.be.a("string").to.equal("Laptop");
    });

    it("should return null when no logo exist in the result object", () => {
      const result: any = {
        localizedObjectAnnotations: [],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseProduct();

      expect(logo).to.be.null;
    });
  });

  describe("parseDescriptiveLabel() method", () => {
    it("should return the logo name if exist in the result object", () => {
      const result: any = {
        labelAnnotations: [
          {
            description: "Computer",
          },
        ],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseDescriptiveLabel();

      expect(logo).to.be.a("string").to.equal("Computer");
    });

    it("should return null when no logo exist in the result object", () => {
      const result: any = {
        labelAnnotations: [],
      };

      const resultParser = new CloudVisionResultParser(result);
      const logo = resultParser.parseDescriptiveLabel();

      expect(logo).to.be.null;
    });
  });
});
