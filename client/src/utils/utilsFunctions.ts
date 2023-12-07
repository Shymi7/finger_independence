import jwt from "jsonwebtoken"
export function isJWTTokenActive(token: string): boolean {
    try {
        const decodedToken = jwt.decode(token);

        if(decodedToken == null || typeof decodedToken == 'string'){
            console.log('token is null or string')
            return false;
        }

        const expirationTime = decodedToken.exp ?? 0;
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

        return currentTime < expirationTime;
    } catch (error) {
        // Token decoding failed, consider it expired
        return false;
    }
}