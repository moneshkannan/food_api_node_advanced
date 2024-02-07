import {Request, Response, NextFunction} from 'express'
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utils';


export const findVendor = async (id: string|undefined, email?:string) => {
    if(email){
        return await Vendor.findOne({email: email})
    }else{
        return await Vendor.findById(id)
    }
}

export const CreateVendor = async(req:Request, res:Response, next: NextFunction) => {
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;
    const ExistingVendor = await findVendor('', email)
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
    const Vendors = await Vendor.find()
    if(!Vendors){
        return res.json({"message":"No Vendors available"})
    }
    return res.json(Vendors)
}

export const GetVendorsById = async(req:Request, res:Response, next: NextFunction) => {
    const id = req.params.id
    const single_vendor = await findVendor(id)
    if (!single_vendor){
        return res.json({"message":"No Vendors available"})
    }
    return res.json(single_vendor)
}