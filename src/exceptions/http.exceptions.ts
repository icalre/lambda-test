import { CARD_EXCEPTION_CODE, CARD_EXCEPTION_MESSAGE } from '../utilities'

export class BaseException {
  private body: string;
  constructor (
    public statusCode: number = CARD_EXCEPTION_CODE.INTERNAL_SERVER_ERROR,
    public message: string = CARD_EXCEPTION_MESSAGE.INTERNAL_SERVER_ERROR,
    private readonly data: any = []
  ) {
    this.statusCode = statusCode
    this.body = JSON.stringify({message: message});
  }
}

export class UnauthorizedException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class BadRequestException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class ConflictException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class NotFoundException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class RequestTimeoutException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class ValidationException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class TokenException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class DatabaseException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}

export class InternalServerErrorException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}
export class ExpiredTokenException extends BaseException {
  constructor (
    statusCode: number,
    message: string
  ) {
    super(statusCode, message, [])
  }
}
