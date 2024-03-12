const express =require("express");
const app = express();
const authRoute =require("./router/auth-router");
const connectDB=require("./utils_to_connect/db");
const cors=require("cors");

const corsOptions ={
  origin:"http://localhost:3000",
  method:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
}

app.use(cors(corsOptions));


app.use(express.json());
app.use("/api/auth", authRoute);

const PORT =5000;
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`server is running at : ${PORT}`);
  });
});