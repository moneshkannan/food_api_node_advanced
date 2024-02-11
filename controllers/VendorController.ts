import { Response, Request, NextFunction } from "express";
import { editVendorInputs, vendorLoginInputs } from "../dto";
import { findVendor } from "./AdminController";
import { generateSignature, validatePassword } from "../utils";
import { createFoodInputs } from "../dto/food.dto";
import { Food } from "../models";

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

export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        
        const vendor = await findVendor(user._id)
        if(vendor != null){
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)
            vendor.coverImages.push(...images)
            const result = await vendor.save();
            return res.json(result);
            
        }
    }
    
    return res.json({"message":"Something went wrong with add food!"})
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

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        const {name, description, category, foodType, readyTime, price} = <createFoodInputs>req.body
        const vendor = await findVendor(user._id)
        if(vendor != null){
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)
            const createFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: images,
                readyTime: readyTime, 
                price: price,
                rating: 0
            })
            vendor.foods.push(createFood)
            const result = await vendor.save();
            return res.json(result);
            
        }
    }
    
    return res.json({"message":"Something went wrong with add food!"})
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        const foods = await Food.find({vendorId: user._id})
        if (foods != null){
            return res.json(foods)
        }
    }
    
    return res.json({"message":"Foods Information Not Found"})
}