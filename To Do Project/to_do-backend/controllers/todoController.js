const mongoose = require('mongoose');
const Todos = require('../dbtodos');


//get todolist
const getTodos = async(req,res) => {
        try{
            const allTodos = await Todos.find({})/scrollTo({createdAt : -1})
            res.status(200).send(allTodos);
        }
        catch(error){
            res.status(400).send(error.message);
        }
}

const createTodo =  async(req,res) =>{
    const dbtodo = req.body;
    try{
        const newTodo = await Todos.create(dbtodo);
        res.status(200).send(newTodo);
    }
    catch(error){
        res.status(400).send(error.message);
    }
};

const updateTodo = async(req,res) =>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send(`invalid id`)
        }
        const todoId =  { _id : id};
        const update = {completed : true};
        const updateTodo = await Todos.FindOneAndUpdate(todoId, update);
        if(!updateTodo){
            return res.status(400).send(`invalid`);
        }
        res.status(200).send(updateTodo);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}
const deleteTodo = async(req,res) =>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send(`invalid id`)
        }
        
        const deleteTodo = await Todos.FindOneAndDelete({_id: id});
        
        res.status(200).send(updateTodo);
    }
    catch(error){
        res.status(500).send(error.message);
    }
};
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}