import { Request, Response } from "express";
import fs from "fs";

// global utils
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";

// local utils
import { CloudVisionResultParser } from "./__utils__/CloudVisionResultParser/CloudVisionResultParser";
import { ImageRecognizer } from "./__utils__/ImageRecognizer/ImageRecognizer";

const imageRecognition = async (req: Request, res: Response) => {
  try {
    if (!req.file?.path) throw "something went wrong when uploading the image";

    const result = await ImageRecognizer.recognize(req.file.path);

    const resultParser = new CloudVisionResultParser(result);

    const product = resultParser.parseProduct();
    const descriptiveLabel = resultParser.parseDescriptiveLabel();
    const dominantColor = resultParser.parseDominantColor();
    const logo = resultParser.parseLogo();

    fs.unlinkSync(req.file.path);

    return JSONResponse.success(res, {
      product,
      descriptiveLabel,
      dominantColor,
      logo,
    });
  } catch (error) {
    JSONResponse.serverError(
      res,
      new Error(`ImageRecognition Error: ${error}`)
    );
  }
};

export { imageRecognition };
