import express, {Request, Response, NextFunction} from 'express'
import { addFood, getFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'images')
    },
    filename: (req, file, cb) => {
        return cb(null, new Date().toString()+'_'+file.originalname)
    }
})

const images = multer({storage: imageStorage}).array('images', 10)

router.post("/login", vendorLogin)
router.use(Authenticate)
router.get("/profile", getVendorProfile)
router.patch("/profile", updateVendorProfile)
router.patch("/service", updateVendorService)

router.post("/food", images, addFood)
router.patch("/coverimage", images, updateVendorCoverImage)
router.get("/foods", getFoods)

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "Hello from Vendor"})
})

export {router as VendorRoute}