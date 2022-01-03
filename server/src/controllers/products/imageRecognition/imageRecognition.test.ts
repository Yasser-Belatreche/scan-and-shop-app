import chai, { expect } from "chai";
import Sinon from "sinon";
import chaiHttp from "chai-http";
import fs from "fs";
import { server } from "../../..";
import { ImageRecognizer } from "./__utils__/ImageRecognizer/ImageRecognizer";

chai.use(chaiHttp);

describe("POST /api/products/imageRecognition", () => {
  const resultMock: any = {
    imagePropertiesAnnotation: {
      dominantColors: {
        colors: [
          {
            color: {
              red: 20,
              green: 18,
              blue: 255,
            },
          },
        ],
      },
    },
    localizedObjectAnnotations: [
      {
        name: "Laptop",
      },
    ],
    logoAnnotations: [
      {
        description: "Lenovo",
      },
    ],
    labelAnnotations: [
      {
        description: "Computer",
      },
    ],
  };

  let recognizeStub: Sinon.SinonStub;
  let fsUnlinkSpy: Sinon.SinonSpy;

  beforeEach(() => {
    recognizeStub = Sinon.stub(ImageRecognizer, "recognize").resolves(
      resultMock
    );
    fsUnlinkSpy = Sinon.spy(fs, "unlinkSync");
  });

  afterEach(() => {
    recognizeStub.restore();
    fsUnlinkSpy.restore();
  });

  after(() => {
    server.close();
  });

  it("should return the image info parsed when everything is OK", (done) => {
    chai
      .request(server)
      .post("/api/products/imageRecognition")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "image",
        "./src/controllers/products/imageRecognition/__utils__/test.png",
        {
          contentType: "image/png",
          filename: "test.png",
        }
      )
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(recognizeStub.calledOnce).to.be.true;
        expect(fsUnlinkSpy.calledOnce).to.be.true;

        expect(res.body).to.have.property("success", true);

        expect(res.body)
          .to.have.property("data")
          .to.have.property("product")
          .to.be.a("string")
          .and.equal("Laptop");
        expect(res.body)
          .to.have.property("data")
          .to.have.property("descriptiveLabel")
          .to.be.a("string")
          .and.equal("Computer");
        expect(res.body)
          .to.have.property("data")
          .to.have.property("logo")
          .to.be.a("string")
          .and.equal("Lenovo");
        expect(res.body)
          .to.have.property("data")
          .to.have.property("dominantColor")
          .to.have.property("hex")
          .to.be.a("string")
          .and.equal("#1412ff");
        expect(res.body)
          .to.have.property("data")
          .to.have.property("dominantColor")
          .to.have.property("rgb")
          .to.be.a("string")
          .and.equal("rgb(20, 18, 255)");

        done();
      });
  });

  it("should return property with null value when one of the image infos are undefined ", (done) => {
    recognizeStub.resolves({
      imagePropertiesAnnotation: {
        dominantColors: {
          colors: [],
        },
      },
      localizedObjectAnnotations: [
        {
          name: "Laptop",
        },
      ],
      logoAnnotations: [],
      labelAnnotations: [],
    });

    chai
      .request(server)
      .post("/api/products/imageRecognition")
      .set("Content-Type", "multipart/form-data")
      .attach(
        "image",
        "./src/controllers/products/imageRecognition/__utils__/test.png",
        {
          contentType: "image/png",
          filename: "test.png",
        }
      )
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(recognizeStub.calledOnce).to.be.true;
        expect(fsUnlinkSpy.calledOnce).to.be.true;

        expect(res.body).to.have.property("success", true);

        expect(res.body)
          .to.have.property("data")
          .to.have.property("product")
          .to.be.a("string")
          .and.equal("Laptop");
        expect(res.body)
          .to.have.property("data")
          .to.have.property("descriptiveLabel").to.be.null;
        expect(res.body).to.have.property("data").to.have.property("logo").to.be
          .null;
        expect(res.body)
          .to.have.property("data")
          .to.have.property("dominantColor")
          .to.have.property("hex").to.be.null;
        expect(res.body)
          .to.have.property("data")
          .to.have.property("dominantColor")
          .to.have.property("rgb").to.be.null;

        done();
      });
  });

  it("should return a server error when no image attached with the request", (done) => {
    chai
      .request(server)
      .post("/api/products/imageRecognition")
      .set("Content-Type", "multipart/form-data")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(recognizeStub.calledOnce).to.be.false;
        expect(fsUnlinkSpy.calledOnce).to.be.false;

        done();
      });
  });
});
