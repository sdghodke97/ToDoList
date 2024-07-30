const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const {
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos
} = require("./controllers/todoController");

//app config

const app = express();
const port = process.env.PORT || 8000;
const connectionURL = process.env.MONGO_URI

//Middleware
app.use(express.json());
app.use(cors());


//DB Config
mongoose
.connect(connectionURL)
.then(()=> {
    app.listen(port,()=>console.log(`running on port : ${port}`))
})
.catch((err)=>{
    console.log(err);
});


//API endpoints

//get todo list
app.get('/todos',getTodos)


//create a todo 
app.post('/todos',createTodos)

//update a todo 
app.put('/todos',updateTodos)

//delete a todo  
app.delete('/todos',deleteTodos)

