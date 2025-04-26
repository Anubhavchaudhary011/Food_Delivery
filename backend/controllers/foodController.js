import FoodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    try {
       
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        let image_filename = `${req.file.filename}`;

        let food = new FoodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "food added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};
//all food list
const listFood= async (req,res)=>{
      try{
        const foods=await FoodModel.find({});
        res.json({success:true,data:foods})

      }
      catch(error){
console.log(error);
res.json({success:true,message:"error"})
      }
}
//remove food
const removeFood=async (req,res)=>{
   try{
   const food =await FoodModel.findById(req.body.id);
   fs.unlink(`uploads/${food.image}`,()=>{})
   await FoodModel.findByIdAndDelete(req.body.id);
   res.json({success:true,message:"food removed"})
   }
   catch(error){
      console.log(error)
      res.json({success:false,message:"error"})
   }
}
export {addFood,listFood,removeFood}

