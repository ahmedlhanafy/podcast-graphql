import { sign, verify} from'jsonwebtoken';
import config from '../../config';

export const generateJwtToken = user =>  {
   const token = sign(user, config.jwtSecret);
   return token;
};

export const verifyToken = token => verify(token, config.jwtSecret);