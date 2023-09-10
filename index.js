import express from "express";
import bodyParser from "body-parser";
import mime from "mime"; // Import the 'mime' package

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));




app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get("/initialTodos", (req, res) => {
    res.json({ todos: todos });
});


app.get("/", (req, res) => {
    res.render("index", { todos: todos });
});


app.post("/addTodo", (req, res) => {
    const newTodoText = req.body.inputTodo;
    const newTodo = {
        text: newTodoText,
        completed: false
    };
    todos.push(newTodo);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("server running on 3000");
});
