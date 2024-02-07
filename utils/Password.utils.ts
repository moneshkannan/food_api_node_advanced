const bycrpt = require('bcrypt')
import jwt from "jsonwebtoken";
import { vendorPayload } from "../dto";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { authPayload } from "../dto/auth.dto";

export const GenerateSalt = async () => {
    return await bycrpt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bycrpt.hash(password, salt)
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = (payload:vendorPayload) => {
    return jwt.sign(payload, APP_SECRET, {expiresIn: '1d'})
}

export const validateSignature = async (req:Request) => {
    const signature = req.get('Authorization');
    console.log(signature)
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1],APP_SECRET) as authPayload
        req.user = payload
        return true
    }
    return false
}