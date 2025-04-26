import mongoose from "mongoose";
const fooSchemea=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number ,required:true},
    category:{type:String,required:true} ,
   
     image:{type:String,required:true}
})
const FoodModel=mongoose.models.food||mongoose.model("food",fooSchemea);
export default FoodModel;