import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import {authMiddleware, cardMiddleware} from '../middlewares';
import {getCardByNumber, saveCard} from '../databases';
import {createResponseAdapter} from '../adapters';
import {redisSet} from '../databases';
import {generateRandomData} from "../utilities";

const register = async (event: any) => {
    const _data = event.body;
    const exist_card = await getCardByNumber(_data.card_number);

    if (!exist_card) {
        await saveCard(_data);
    }

    const card_token = generateRandomData();

    await redisSet(card_token, _data.card_number);

    return createResponseAdapter(200, {
        success:true,
        token:card_token
    });
};
export const handler = middy(register).use(jsonBodyParser()).use(cardMiddleware).use(authMiddleware());
