import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationExceptiont } from "../exceptions/validation.exception";


@Injectable()
export class MyValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata) :Promise<any> {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);
        if(errors.length){
            let messages = errors.map((err) => {
                return `${err.property}: ${Object.values(err.constraints).join(
                    ', |',
                )}`
            });
            throw new ValidationExceptiont(messages);
        }
        return value;
    }
}