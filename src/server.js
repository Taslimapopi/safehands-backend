import 'dotenv/config'
import connectDB from './config/db.js'
import app from './app.js'

const port = process.env.PORT || 5001

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`safehands running on ${port}`)
    })
})