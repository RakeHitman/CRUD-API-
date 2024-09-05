import express, { urlencoded } from "express";
import mongoose from "mongoose";
import Product from "./Models/models.products.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.send(req.body);
    console.log(req.body);
})

app.get("/crud/products" , async (req , res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

app.get("/crud/products/:id" , async (req , res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

app.post("/crud/products" , async (req , res) => {
    try {
        const product =  await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

app.put("/crud/products/:id" , async (req , res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id , req.body);
        if(!product) {
            return res.status(500).json({error :"ID not available"});
        }
        let updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

app.delete("/crud/products/:id" , async (req , res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(500).json({error:"ID not available"});
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

mongoose.connect("mongodb+srv://flex4104:bdmIs5u31hxU8lnw@crudcluster.i5n6q.mongodb.net/?retryWrites=true&w=majority&appName=crudCluster")
.then(() => {
    console.log("Connected to database")
    app.listen(port , (req ,res) => {
        console.log(`Server running at port ${port}`)
    })
})
.catch(() => {
    console.log("Failed to conncet")
})