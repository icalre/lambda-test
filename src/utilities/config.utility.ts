import * as dotenv from 'dotenv';

dotenv.config();
const configData = {SECRET_JWT: process.env.SECRET_JWT}
export const getConfig = (key: string) => {
    const configs = configData
    if (configs.hasOwnProperty(key)) {
        return configs[key]
    }

    return null;
}

