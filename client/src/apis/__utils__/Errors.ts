type Response = {
  success: boolean;
  errors: any;
};

export class ErrorResponse {
  constructor(public status: number, public readonly response: Response) {}
}

export class InvalidInputValuesError implements ErrorResponse {
  public readonly status: number = 400;
  constructor(public readonly response: Response) {}
}

export class NotAuthorizeError implements ErrorResponse {
  public readonly status: number = 401;
  constructor(public readonly response: Response) {}
}

export class InternalServerError implements ErrorResponse {
  public readonly status: number = 500;
  constructor(public readonly response: Response) {}
}

export class NetworkError {
  constructor(public readonly response: string) {}
}
