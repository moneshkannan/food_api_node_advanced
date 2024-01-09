import {Request, Response, NextFunction} from 'express'
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utils';

export const CreateVendor = async(req:Request, res:Response, next: NextFunction) => {
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;
    const ExistingVendor = await Vendor.findOne({email: email})
    if(ExistingVendor){
        return res.json({"message":"A Vendor is already Found"})
    }
    // generate salt and password
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt)
    const CreateVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType, 
        email: email, 
        password: userPassword, 
        salt: salt,
        ownerName: ownerName, 
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: []

    })
    return res.json(CreateVendor)
}

export const GetVendors = async(req:Request, res:Response, next: NextFunction) => {

}

export const GetVendorsById = async(req:Request, res:Response, next: NextFunction) => {

}