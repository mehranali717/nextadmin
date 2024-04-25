import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async(q, page)=>{
    const ITEMS_PER_PAGE = 2;
    const regex = new RegExp(q,"i")
    try{
        connectToDB()
        const count =await User.find({username:{$regex:regex}}).count();
        const users = await User.find({username:{$regex:regex}}).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page - 1));
        return {count, users};   
    }catch(err){
        throw new Error("Failed to fetch users!")
    }
}
export const fetchProducts = async(q, page)=>{
    const ITEMS_PER_PAGE = 2;
    const regex = new RegExp(q,"i")
    try{
        connectToDB()
        const count = await Product.find({title:{$regex:regex}}).count();
        const products = await Product.find({title:{$regex:regex}}).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page - 1))
        return {count, products}
    }catch(err){
        throw new Error("Failed to fetch products!")
    }
}