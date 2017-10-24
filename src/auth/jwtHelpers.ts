import { sign, verify } from 'jsonwebtoken';
import config from '../config/settings';

export const generateToken = (user: any): string =>
  sign(user, config.jwtSecret);

export const verifyToken = (token: string): any =>
  verify(token, config.jwtSecret);
