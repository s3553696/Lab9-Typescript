"use strict";
console.log("TodoIt");
// Store the todo items
var todoList = [];
// Get the input and list elements
var todoInput = document.getElementById("todoInput");
var todoListDiv = document.getElementById("todoListContainer");
// Add a new todo item
function addTodo() {
    if (todoInput == null) {
        console.error("The todo input is missing from the page!");
        return;
    }
    var newTodo = todoInput.value;
    if ("" !== newTodo.trim()) {
        console.log("Adding todo: ", newTodo);
        todoList.push(newTodo);
        console.log("New todo list: ", todoList);
        todoInput.value = "";
        // Keep the list sorted alphabetically
        todoList.sort();
        // Update and filter the displayed list
        updateTodoList();
        filterTodoList();
    }
}
// Display existing todo items
function updateTodoList() {
    console.log("Updating the rendered todo list");
    todoListDiv.innerHTML = "";
    todoListDiv.textContent = "";
    if (todoList.length === 0) {
        todoListDiv.textContent = "Nothing to do, hurray!";
        return;
    }
    var ul = document.createElement("ul");
    ul.setAttribute("id", "todoList");
    todoListDiv.appendChild(ul);
    todoList.forEach(function (item) {
        var li = document.createElement("li");
        li.setAttribute("class", "todo-list-item");
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = item;
        link.onclick = function (event) {
            event.preventDefault();
            removeTodoListItem(item);
        };
        li.appendChild(link);
        ul.appendChild(li);
    });
}
// Filter existing todo items
function filterTodoList() {
    console.log("Filtering the rendered todo list");
    var todoListHtml = document.getElementById("todoList");
    if (todoListHtml === null) {
        console.log("Nothing to filter");
        return;
    }
    var todoListFilter = document.getElementById("todoFilter");
    var todoListFilterText = todoListFilter.value.toUpperCase();
    todoListHtml.childNodes.forEach(function (item) {
        var itemText = item.textContent;
        if (itemText !== null) {
            itemText = itemText.toUpperCase();
            if (itemText.startsWith(todoListFilterText)) {
                item.style.display = "list-item";
            }
            else {
                item.style.display = "none";
            }
        }
    });
}
// Remove an individual todo item
function removeTodoListItem(itemToRemove) {
    console.log("Item to remove: ", itemToRemove);
    todoList = todoList.filter(function (value) {
        return value !== itemToRemove;
    });
    updateTodoList();
    filterTodoList();
}
// Remove all todo items
function removeAllTodos() {
    console.log("Removing all todo items");
    // Clear the array
    todoList = [];
    // Clear the filter
    var todoFilter = document.getElementById("todoFilter");
    todoFilter.value = "";
    // Refresh the displayed list
    updateTodoList();
    console.log("All todo items removed");
}
//# sourceMappingURL=todo-it.js.map