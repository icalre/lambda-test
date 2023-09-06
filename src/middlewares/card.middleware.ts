import { CARD_EXCEPTION_CODE, CARD_EXCEPTION_MESSAGE } from "../utilities";
import {Card, Response} from "../models";
import * as Joi from 'joi';
import * as luhn from 'luhn';
import {createResponseAdapter} from '../adapters';
export const cardMiddleware = {
    before: (event:any)=>{
        const card: Card = event.event.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            card_number: Joi.string().min(13).max(16).required(),
            cvv: Joi.string().min(3).max(4).required(),
            expiration_year: Joi.string().length(4).required(),
            expiration_month: Joi.string().min(1).max(2).required()
        });

        let response: Response = {
            code:CARD_EXCEPTION_CODE.SUCCESS,
            message: CARD_EXCEPTION_MESSAGE.SUCCESS,
            success: false
        };

        const { error } = schema.validate(card);
        if (error) {
            response.code = CARD_EXCEPTION_CODE.INVALID_DATA;
            response.message = CARD_EXCEPTION_MESSAGE.INVALID_DATA + ' => ' + error.details[0].message;
            return createResponseAdapter(200, response);
        }
        const isValidCard: boolean = luhn.validate(card.card_number);
        if (!isValidCard) {
            response.code = CARD_EXCEPTION_CODE.CARD_NUMBER_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.CARD_NUMBER_ERROR;
            return createResponseAdapter(200, response);
        }
        if (card.card_number.charAt(0) === '3' && card['cvv'].length === 3) {
            response.code = CARD_EXCEPTION_CODE.CVV_AMEX_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.CVV_AMEX_ERROR;
            return response;
        }
        if (card['card_number'].charAt(0) !== '3' && card['cvv'].length === 4) {
            response.code = CARD_EXCEPTION_CODE.CVV_VISA_MASTERCARD_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.CVV_VISA_MASTERCARD_ERROR;
            return createResponseAdapter(200, response);
        }
        if(Number(card['expiration_month']) < 1 || Number(card['expiration_month']) > 12){
            response.code = CARD_EXCEPTION_CODE.EXPIRATION_MONTH_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.EXPIRATION_MONTH_ERROR;
            return createResponseAdapter(200, response);
        }
        var today = new Date(), yearNow = Number(today.getFullYear()), yearMax = yearNow + 5;
        if(Number(card['expiration_year']) < yearNow){
            response.code = CARD_EXCEPTION_CODE.EXPIRATION_YEAR_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.EXPIRATION_YEAR_ERROR;
            return createResponseAdapter(200, response);
        }
        if(Number(card['expiration_year']) > yearMax){
            response.code = CARD_EXCEPTION_CODE.EXPIRATION_YEAR_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.EXPIRATION_YEAR_ERROR + `=> No puede exceder el siguiente año: ${yearMax}`;
            return createResponseAdapter(200, response);
        }

        const emailParts = card['email'].split('@'), domain = emailParts[1];
        if(domain === 'gmail.com' || domain === 'hotmail.com' || domain === 'yahoo.es'){
            console.log('correo valido');
        }else{
            response.code = CARD_EXCEPTION_CODE.EMAIL_ERROR;
            response.message = CARD_EXCEPTION_MESSAGE.EMAIL_ERROR;
            return createResponseAdapter(200, response);
        }
    }
}

