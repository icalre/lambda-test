import {CardSchema} from "../schema/card.schema";
import {getDataSource} from "../provider/connection.provider";
import {loggerUtility} from "../../../utilities";

export const getCardById = async (id: number) => {
    try {
        const DatabaseProviders = await getDataSource();
        return await DatabaseProviders.getRepository(CardSchema).findOneBy({id});
    } catch (err) {
        loggerUtility.error(err);
        throw err;
    }
}

export const getCardByNumber = async (card_number: string) => {
    try {
        const DatabaseProviders = await getDataSource();
        return await DatabaseProviders.getRepository(CardSchema).findOneBy({card_number});
    } catch (err) {
        loggerUtility.error(err);
        throw err;
    }
}


export const saveCard = async (entity: any) => {
    try {
        const DatabaseProviders = await getDataSource();
        await DatabaseProviders.getRepository(CardSchema).save(entity);
    } catch (err) {
        loggerUtility.error(err);
        throw err;
    }

}
