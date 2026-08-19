import { authenticate } from "ldap-authentication";
import ldapAuth from "../middlewares/ldapAuth.js";
import getUserData from "../middlewares/getUserData.js";
import getJWTToken from "../middlewares/getJWTToken.js";

export const signIn = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
        message: "No token",
        });
    }

    if(authHeader !== process.env.TOKEN_SIGNIN){
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        });
    }
    const { username, password } = req.body;
    try{
        const ldap_auth = await ldapAuth(`uid=${username}, dc=swu, dc=ac, dc=th`, password, 'ldap://ldap.swu.ac.th');
        //const token = await getJWTToken(username);
        const user_data = await getUserData(username);
        return res.status(200).json(user_data);
    }catch(err){
        console.error('Error during sign-in:', err);
        if(err.name === 'LdapAuthenticationError' && err.message === ' Code: 0x31') {
            return res.status(401).json({
                message: 'Unauthorized: Invalid username or password'
            });
        }
        if(err.message.includes('Failed to fetch user data')) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error: Unable to sign in'
        });
    }
}