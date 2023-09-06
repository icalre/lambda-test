import IORedis from "ioredis";
import {loggerUtility} from "../../utilities";
import * as dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
    const client = new IORedis({
        host: process.env.REDIS_HOST,
        port: 6379,
        retryStrategy(times) {
            var delay = Math.min(times * 100, 2000);
            return delay;
        },
        maxRetriesPerRequest: 3
    });

    client.on("connect", () => {
        loggerUtility.info("Connected to redis");
    });

    client.on("error", err => {
        loggerUtility.error(`Redis error: ${err}`);
    });

    return client;
}

export const redisGet = async (key: string) => {
    const redis_client = await connect();
    return await redis_client.get(key);
}

export const redisSet = async (key:string,value:any) => {
    const redis_client = await connect();
    redis_client.set(key, JSON.stringify(value));
    redis_client.expire(key, 900);
}
