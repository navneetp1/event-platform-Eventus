import mongoose from 'mongoose'

//trying to retrieve a mongoose property about cached.connection and cached.promise
let cached = (global as any).mongoose || { conn: null, promise: null}

const MONGODB_URI = process.env.MONGODB_URI

export const connectToDB = async() =>  {
    
    //connection running first time 
    if(cached.conn) 
        return cached.conn

    if(!MONGODB_URI) throw new Error("MONGODB_URI is missing.")
    
    //establishing a cached connection
    //connect to an existing connection or create a new one
    cached.promise = cached.promise.then || mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise

    return cached.conn
}
