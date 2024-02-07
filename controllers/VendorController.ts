import { Response, Request, NextFunction } from "express";
import { editVendorInputs, vendorLoginInputs } from "../dto";
import { findVendor } from "./AdminController";
import { generateSignature, validatePassword } from "../utils";

export const vendorLogin =  async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = <vendorLoginInputs>req.body;
    const existingVendor = await findVendor('', email);
    if(existingVendor !== null){
        // validation and given access
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt)
        if(validation){
            const signature = generateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })
            return res.json(signature)
        }else{
            return res.json({"message":"Password is not Valid"})
        }
    }
    return res.json({"message":"Login is not Valid"})
}

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        const existingVendor = await findVendor(user._id)
        return res.json(existingVendor)
    }
    return res.json({"message":"Login is not Valid"})
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {foodTypes, address, name, phone} = <editVendorInputs>req.body
    const user = req.user
    if(user){
        const existingVendor = await findVendor(user._id)
        if(existingVendor != null){
            existingVendor.name = name
            existingVendor.foodType = foodTypes
            existingVendor.phone = phone
            existingVendor.address = address
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }
    return res.json({"message":"Vendor Information Not Found"})
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        const existingVendor = await findVendor(user._id)
        if(existingVendor != null){
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }
    return res.json({"message":"Vendor Information Not Found"})
}