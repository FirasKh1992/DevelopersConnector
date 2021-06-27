const express = require('express');
const app = express(); //initialize our app variable with express
const connectDB = require('./config/db');

connectDB();
app.get('/', (req, res) => res.send('API running'));


//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/post',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
