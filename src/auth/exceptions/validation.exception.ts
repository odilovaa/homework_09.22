import { HttpException, HttpStatus } from "@nestjs/common";
import { subscribe } from "diagnostics_channel";


export class ValidationExceptiont extends HttpException{
    messages: string | Record<string, any>;
    constructor(response: string | Record<string, any>){
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}