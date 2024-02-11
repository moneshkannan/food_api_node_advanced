import express, {Request, Response, NextFunction} from 'express'
import { getFoodAvailability, getFoodsIn30Min, getTopRestaurants, restaurantById, searchFoods } from '../controllers';

const router = express.Router();

/** -------------------------- Food Availability ----------------------- **/
router.get('/:pincode', getFoodAvailability)

/** -------------------------- Top Restaurants ----------------------- **/
router.get('top-restaurants/:pincode', getTopRestaurants)

/** -------------------------- Foods Available in 30 minutes ----------------------- **/
router.get('/foods-in-30-min/:pincode', getFoodsIn30Min)

/** -------------------------- Search Foods ----------------------- **/
router.get('/search/:pincode', searchFoods)

/** -------------------------- Find Restaurant Id ----------------------- **/
router.get('/restaurant/:id', restaurantById)

export {router as ShoppingRoute}