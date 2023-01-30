// Create basic express nodejs server

// Init express
const express = require('express');

// import Auth route
const authRoutes = require("./routes/auth.js")
//cors: to cors original requests
const cors = require('cors');

// create instans for the application 
const app = express();
// process.env.PORT : for delploy ||| 5000: for local
const PORT = process.env.PORT || 5050;

require('dotenv').config();

app.use(cors());
// Allo to pass from front-end to back-end
app.use(express.json());

app.use(express.urlencoded())

// ========== Routing ==========
// root rout
app.get('/',(req,res) => {
    res.send('Hello,World');
})
app.listen(PORT,()=>console.log(`Server running on port http://localhost:${PORT}`))