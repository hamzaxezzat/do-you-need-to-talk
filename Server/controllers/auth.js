const {connect} = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')
const { json } = require('express')

// Those Values in Dashboard | Bring Values from ".env" file
const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const app_id = process.env.STREAM_APP_ID

const signup = async (req,res) => {
    try{
        // req.body : everything come from the frontend form
        const {fullName, username, password, phoneNumber} = req.body;
        
        // Create Random userID with this structure 
        const userId = crypto.randomBytes(16).toString('hex');

        // To connect to Server client getStream > to create new user token
        const serverClient = connect(api_key,api_secret,app_id);

        // To encrypt password from plain text to hashed
        const hashedPassword = await bcrypt.hash(password,10) ;

        // Initiate User Token
        const token = serverClient.createUserToken(userId);

        // To return data to frontend
        res.status(200).json({token, fullName, username, userId, hashedPassword,phoneNumber})

    } catch (error){
        console.log(error)
        res.status(500).json({message:error});
    }
};
const login = async (req,res) => {
    try{
        const {username, password} = req.body;

        // To connect to Server client getStream > to create new user token
        const serverClient = connect(api_key,api_secret,app_id);

        const client = StreamChat.getInstance(api_key,api_secret )
        
        // new instance for steam chat > to bring all users who match this spacific username
        // Again: we fetch req.body: fetch username > if it exist put it as users, if not return none
        const {users} = await client.queryUsers({name:username})

        // If user login not exist return this message
        if(!users.length) return res.status(400).json({message: 'User not found'})

        // If username exist > compare between new input and decrepted password 
        const success = await bcrypt.compare(password,users[0].hashedPassword);

        // to create USER TOKEN by this valuse
        const token = serverClient.createUserToken(users[0].id)

        // if : 1.username exist, 2.password compared 3.ctrated token > Send the data to the frontend
        // if true: res.status(200).json({token}): mean send token
        if(success){
            res.status(200).json({token,fullName: users[0].fullName, username,userId: users[0].id})
        } else {
            res.status(500).json({message: 'Incorrect Password'})
        }

    } catch (error){
        console.log(error)
        res.status(500).json({message:error});
    }
};

module.exports = {login,signup}