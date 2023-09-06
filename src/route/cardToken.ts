import middy from "@middy/core";
import {authMiddleware} from "../middlewares";
import {getCardByNumber, redisGet} from '../databases';
import {createCardAdapter, createResponseAdapter} from '../adapters';
import jsonBodyParser from "@middy/http-json-body-parser";
export const getCardDetail = async (event: any) => {

    const _data= event.queryStringParameters;

    const token_data = await redisGet(_data.token);

    if(!!token_data)
    {
        const exist_card = await getCardByNumber(JSON.parse(token_data));

        return createResponseAdapter(200, {
            success:true,
            card:createCardAdapter(exist_card)
        });
    }

    return createResponseAdapter(200, {
        success:false,
        message:'Token expirado.'
    });
};

export const handler = middy(getCardDetail).use(jsonBodyParser()).use(authMiddleware());

