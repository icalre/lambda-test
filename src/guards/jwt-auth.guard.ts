import {getConfig} from "../utilities";
import {loggerUtility} from "../utilities";

export const verifyToken = (event: any) => {
    try {
        const { authorization } = event;

        if (!authorization) {
            return false;
        }

        const token =authorization.replace("Bearer ", "");

        if(!token.startsWith('pk_test_')) {
            return false;
        }
        if(token.length !== 24) {
            return false;
        }

        if(token !== getConfig("SECRET")){
            return false;
        }

        return true
    }catch (err){
        loggerUtility.info(err);
        return false;
    }
}
