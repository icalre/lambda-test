import {verifyToken} from "../guards/jwt-auth.guard";
import {UnauthorizedException} from "../exceptions";
export const authMiddleware = () => {
    console.log('Holaa');
    return {
        before: (event: any) => {
            const responseVerify: any = verifyToken(event.event.headers);
            console.log(responseVerify);
            if (!responseVerify) {
                return new UnauthorizedException(401, 'No autorizado.');
            }
        }
    }
}
