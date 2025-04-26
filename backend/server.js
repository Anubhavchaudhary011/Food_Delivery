import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config.js"
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();
//db connection

const port=4000;
app.use(express.json())
app.use(cors());
connectdb();
//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
    res.send("api working");
})
app.use("/api/cart",cartRouter)
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

//mongodb://anubhav:<db_password>@ac-xlwaskh-shard-00-00.8jzyu64.mongodb.net:27017,ac-xlwaskh-shard-00-01.8jzyu64.mongodb.net:27017,ac-xlwaskh-shard-00-02.8jzyu64.mongodb.net:27017/?replicaSet=atlas-aywbep-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
