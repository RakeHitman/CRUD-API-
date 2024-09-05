import mongoose from "mongoose";


const productSchema = mongoose.Schema(
    {
        name : {
            type:String,
            required:[true , "Please enter the name"],        
        } , 
        quantity : {
            type:Number,
            required:true,
            default:0
        } ,
        price : {
            type:Number , 
            required:  true , 
            default:0
        } , 
        available : {
            type: Boolean,
            required:false,
        } ,
        rating : {
            type:Number , 
            required:true
        }
    } , {
        timestamps:true
    }
);

const Product = mongoose.model("Product" , productSchema);
export default Product;