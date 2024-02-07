import { authPayload } from "../dto/auth.dto";
import {Request, Response, NextFunction} from 'express'
import { validateSignature } from "../utils";

declare global{
    namespace Express {
        interface Request{
            user?: authPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateSignature(req)
    if(validate){
        next();
    }else{
        res.json({"message":"user not Authorized"})
    }
}