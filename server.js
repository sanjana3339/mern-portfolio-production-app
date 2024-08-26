const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path=require('path');

//dotenv configuarration
dotenv.config();

//REST OBJECT
const app = express();

//middleware 
app.use(cors());
app.use(express.json());

//static file access
app.use(express.static(path.join(__dirname,'./frontend/build')));

//routes
app.use('/api/v1/portfolio',require("./routes/portfolioRoute"));

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
});

//port
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
}
);