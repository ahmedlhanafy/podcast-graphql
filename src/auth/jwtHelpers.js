/** @flow */

import { sign, verify } from 'jsonwebtoken';
import config from '../config/settings';

export const generateToken = (user: any): string =>
  sign(user, config.auth.secret);

export const verifyToken = (token: string): any =>
  verify(token, config.auth.secret);
