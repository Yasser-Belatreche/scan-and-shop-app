import { expect } from "chai";
import Sinon from "sinon";
import vision from "@google-cloud/vision";

import { ImageRecognizer } from "./ImageRecognizer";

describe("ImageRecognizer Class", () => {
  describe("recognize method", () => {
    const pathMock = "./uploads/somePath";
    const resultMock = [{ color: [{ red: 22, blue: 22 }] }];

    let imageAnnotatorClientStub: Sinon.SinonStub;
    let annotateImageMock: Sinon.SinonSpy;

    beforeEach(() => {
      annotateImageMock = Sinon.stub().resolves(resultMock);

      imageAnnotatorClientStub = Sinon.stub(
        vision,
        "ImageAnnotatorClient"
      ).returns({ annotateImage: annotateImageMock });
    });

    afterEach(() => {
      annotateImageMock.resetHistory();
      imageAnnotatorClientStub.restore();
    });

    it("should return the result data when everything is ok", async () => {
      const result = await ImageRecognizer.recognize(pathMock);

      expect(imageAnnotatorClientStub.calledOnce).to.be.true;
      expect(imageAnnotatorClientStub.returnValues[0]).to.have.property(
        "annotateImage"
      );

      expect(annotateImageMock.calledOnce).to.be.true;
      expect(annotateImageMock.args[0][0])
        .to.have.property("image")
        .to.have.property("source")
        .to.have.property("filename", pathMock);

      expect(annotateImageMock.args[0][0])
        .to.have.property("features")
        .to.have.deep.members([
          {
            type: "IMAGE_PROPERTIES",
            maxResults: 1,
          },
          {
            type: "LABEL_DETECTION",
            maxResults: 1,
          },
          {
            type: "LOGO_DETECTION",
            maxResults: 1,
          },
          {
            type: "OBJECT_LOCALIZATION",
            maxResults: 1,
          },
        ]);

      expect(result).to.deep.equal(resultMock[0]);
    });

    it("should throw an error if something wrong happend", async () => {
      const error = "something went wrong";

      annotateImageMock = Sinon.stub().rejects(error);

      imageAnnotatorClientStub.returns({ annotateImage: annotateImageMock });

      await expect(ImageRecognizer.recognize(pathMock)).to.be.rejectedWith(
        error
      );
    });
  });
});
