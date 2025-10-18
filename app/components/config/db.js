import mongoose from "mongoose"
let cached =global.mangoose || {conn: null, promise:null};

export default async function connectonDB(){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise =(await mongoose.connect(process.env.MONGODB_URI)).then((mongoose)=>mongoose);

    }
    try{
        cached.conn = await cached.promise

    }catch(error){
        console.error("Enter connecting to MongoDB:",error);


    }
    return cached.conn
}
