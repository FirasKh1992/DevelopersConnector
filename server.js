const express = require('express');
const app = express(); //initialize our app variable with express
const connectDB = require('./config/db');
const path = require('path')
connectDB();

//init Middleware
app.use(express.json({extended:false}))



//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));

//serve static assets on production 
if(process.env.NODE_ENV=='production'){
    //set the static folder 
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
