import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";

    try {
        // Create and save the order first
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Format line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "AUD",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents and ensure integer
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "AUD",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 200, // $2 in cents
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return the session URL to redirect the user
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Order placement failed." });
    }
};
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
// user oeder for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
//listing orders for admin pannel
const listOrders = async (req, res) => {
   try {
    const orders=await orderModel.find({})
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
   }
}
// api to for updating order status
const updateStatus=async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({sucess:true,message:"Status updated"})
  } catch (error) {
    console.log("Error")
    res.json({success:false,message:"Error"})
  }
}
export { placeOrder, verifyOrder, userOrders, listOrders,updateStatus };