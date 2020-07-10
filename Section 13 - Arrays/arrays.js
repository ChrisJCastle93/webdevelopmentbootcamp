var todos = ["buy new turtle"];
var input = prompt("what would you like to do?");

while (input !== "quit"){

    if(input === "list"){
        printList();
    } else if(input === "new"){
        addTodo();
    } else if(input === "delete"){
        deleteTodo();
    }
    input = prompt("what would you like to do?");
}
console.log("game over");

function printList() {
    console.log("******");
    todos.forEach(function(todo, i){
    console.log(todo);
    });
    console.log("******");
}

function addTodo() {
    var newTodo = prompt("what would you like to add?");
    todos.push(newTodo);
    console.log(newTodo + " added to list")
}

function deleteTodo() {
    var deletetodo = prompt("Enter name of what you want to delete");
    var index = todos.indexOf(deletetodo);
    todos.splice(index, 1);
    console.log(deletetodo + " removed from list")

}