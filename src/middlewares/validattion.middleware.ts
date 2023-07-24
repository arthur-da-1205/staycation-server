import { HttpException } from '@exceptions/HttpException';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    const plain = value === 'body' ? req.body : value === 'query' ? req.query : req.params;

    validate(plainToInstance(type, plain, { enableImplicitConversion: value === 'query' }), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const formattedErrors: any = {};
        errors.map((error: ValidationError) => {
          formattedErrors[error.property] = getError(error);
        });

        next(new HttpException(400, formattedErrors));
      } else {
        next();
      }
    });
  };
};

const getError = (error: ValidationError) => {
  if (error?.constraints) return Object.values(error.constraints);

  if (error?.children) {
    const result: any = {};
    for (const child of error.children) {
      result[child.property] = getError(child);
    }

    return result;
  }
};

export default validationMiddleware;
