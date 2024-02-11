import express from 'express'
import {AdminRoute, VendorRoute} from './routes'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path'
import { MONGO_URI } from './config';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, 'images')))

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);


mongoose.connect(MONGO_URI).then((res)=>{
    // console.log(res)
    console.log("DB Connected Successfully")

}).catch((e) => console.log(e))

app.listen(8000,()=>{
    console.clear();
    console.log("app is listening in port 8000")
})