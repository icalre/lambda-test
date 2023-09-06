import {UnauthorizedException} from "../exceptions";
import {getConfig} from "../utilities";
import * as jwt from 'jsonwebtoken';
import {loggerUtility} from "../utilities";

export const verifyToken = (event: any) => {
    try {
        const token = event.authorization.replace("Bearer ", "");
        if (!token) return new UnauthorizedException(401,'No autorizado.');
        return jwt.verify(token, getConfig("SECRET_JWT"));
    }catch (err){
        loggerUtility.info(err);
        return false;
    }
}
