import { NextFunction, Request, Response } from "express";
import { expect } from "chai";
import Sinon from "sinon";
import { auth } from "./auth";
import { JWT } from "../utils/__classes__/JWT/JWT";

describe("auth middleware", () => {
  it("should return a not authorize response when there is no token in the headers", async () => {
    const jsonStub = Sinon.stub();
    const statusStub = Sinon.stub().returns({ json: jsonStub });
    const nextStub = Sinon.stub();
    const res: any = { status: statusStub, json: jsonStub };
    const req = { headers: {} } as Request;

    await auth(req, res, nextStub);

    expect(statusStub.calledOnce).to.be.true;
    expect(statusStub.args[0][0]).to.equal(401);

    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.args[0][0]).to.have.property("success").to.be.false;
    expect(jsonStub.args[0][0])
      .to.have.property("errors")
      .to.includes("No token in the headers");
  });

  it("should return a not authorize response when the user from the token does not exist", async () => {
    const jsonStub = Sinon.stub();
    const statusStub = Sinon.stub().returns({ json: jsonStub });
    const nextStub = Sinon.stub();
    const res: any = { status: statusStub, json: jsonStub };
    const req = {
      headers: { authorization: `Bearer ${JWT.sign({ userId: -1 })}` },
    } as Request;

    await auth(req, res, nextStub);

    expect(statusStub.calledOnce).to.be.true;
    expect(statusStub.args[0][0]).to.equal(401);

    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.args[0][0]).to.have.property("success").to.be.false;
    expect(jsonStub.args[0][0])
      .to.have.property("errors")
      .to.includes("User in the headers not exist");
  });

  it("should return a not authorize reponse when the decoded token does not have the userId property", async () => {
    const jsonStub = Sinon.stub();
    const statusStub = Sinon.stub().returns({ json: jsonStub });
    const nextStub = Sinon.stub();
    const res: any = { status: statusStub, json: jsonStub };
    const req = {
      headers: { authorization: `Bearer ${JWT.sign(-1)}` },
    } as Request;

    await auth(req, res, nextStub);

    expect(statusStub.calledOnce).to.be.true;
    expect(statusStub.args[0][0]).to.equal(401);

    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.args[0][0]).to.have.property("success").to.be.false;
    expect(jsonStub.args[0][0])
      .to.have.property("errors")
      .to.includes("does not have a userId property");
  });

  it("should put the userId in the headers object and call the next function when everything is ok", async () => {
    const jsonStub = Sinon.stub();
    const statusStub = Sinon.stub().returns({ json: jsonStub });
    const nextStub = Sinon.stub();
    const res: any = { status: statusStub, json: jsonStub };
    const req = {
      headers: { authorization: `Bearer ${JWT.sign({ userId: 14 })}` },
    } as Request;

    await auth(req, res, nextStub);

    expect(statusStub.calledOnce).to.be.false;
    expect(jsonStub.calledOnce).to.be.false;
    expect(req.headers.userId).to.equal(14);
    expect(nextStub.calledOnce).to.be.true;
  });
});
