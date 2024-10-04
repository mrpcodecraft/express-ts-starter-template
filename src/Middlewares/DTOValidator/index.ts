import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import express from 'express';
import HttpException from '../../Exceptions/HTTPExceptions';
 
export default function DTOValidationMiddleware<T>(DTOClass: any): express.RequestHandler {
  return async (req, res, next) => {
    try {
        const data  = req.method == "GET" ? req.query : req.body;

        // Transform plain JSON to DTO class instance using plainToInstance
        const dtoObject = plainToInstance(DTOClass, req.body);

        // Validate the DTO instance
        const errors: ValidationError[] = await validate(dtoObject, {
            whitelist: true,               // Strip properties that do not have any decorators
            forbidNonWhitelisted: true,     // Throw an error if non-whitelisted properties are present
            skipMissingProperties: true
        });

        if (errors.length > 0) {
            // Extract error messages
            const errorMessages = errors
                .map((error: ValidationError) => Object.values(error.constraints || {}))
                .flat();

            // Respond with validation errors
            return next(new HttpException(400, "Validation Failure",errorMessages));
        } else {
            // Optionally, attach the validated DTO to the request object
            req.body = dtoObject;
            next();
        }
    } catch (err) {
        return next(new HttpException(400, "Validation Failure",{ errors: ["Internal server error during validation."] }));
    }
  };
}