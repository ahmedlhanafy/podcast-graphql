import { sign, verify } from 'jsonwebtoken';
import config from '../../config';

export const generateToken = (user: any): string => {
    const token = sign(user, config.jwtSecret);
    return token;
};

export const verifyToken = (token: string): any =>
    verify(token, config.jwtSecret);
