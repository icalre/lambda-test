import * as dotenv from 'dotenv';

dotenv.config();
const configData = {SECRET: process.env.SECRET}
export const getConfig = (key: string) => {
    const configs = configData
    if (configs.hasOwnProperty(key)) {
        return configs[key]
    }

    return null;
}

