import * as jwt from "jsonwebtoken";
import {getConfig} from "../utilities";
export const handler = async (event: any) => {

    const key_test = jwt.sign({
        user: 'test'
    }, getConfig('SECRET_JWT'), { expiresIn: 60 * 60 });

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            token: key_test
        }),
    };
};
