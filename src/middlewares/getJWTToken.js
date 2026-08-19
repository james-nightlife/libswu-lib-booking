import jwt from 'jsonwebtoken'; 

const getJWTToken = (username) => {
    const payload = {
        username: username
    }

    const SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(payload, SECRET, { expiresIn: '3h' });
    return token;
}

export default getJWTToken;