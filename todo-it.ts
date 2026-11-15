console.log("TodoIt");

// Store the todo items
let todoList: string[] = [];

// Get the input and list elements
const todoInput: HTMLInputElement =
    document.getElementById("todoInput") as HTMLInputElement;

const todoListDiv: HTMLDivElement =
    document.getElementById("todoListContainer") as HTMLDivElement;

// Add a new todo item
function addTodo(): void {
    if (todoInput == null) {
        console.error("The todo input is missing from the page!");
        return;
    }

    const newTodo: string = todoInput.value;

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
function updateTodoList(): void {
    console.log("Updating the rendered todo list");

    todoListDiv.innerHTML = "";
    todoListDiv.textContent = "";

    if (todoList.length === 0) {
        todoListDiv.textContent = "Nothing to do, hurray!";
        return;
    }

    const ul = document.createElement("ul");
    ul.setAttribute("id", "todoList");
    todoListDiv.appendChild(ul);

    todoList.forEach(item => {
        const li = document.createElement("li");
        li.setAttribute("class", "todo-list-item");

        const link = document.createElement("a");
        link.href = "#";
        link.textContent = item;

        link.onclick = (event) => {
            event.preventDefault();
            removeTodoListItem(item);
        };

        li.appendChild(link);
        ul.appendChild(li);
    });
}

// Filter existing todo items
function filterTodoList(): void {
    console.log("Filtering the rendered todo list");

    const todoListHtml: HTMLUListElement =
        document.getElementById("todoList") as HTMLUListElement;

    if (todoListHtml === null) {
        console.log("Nothing to filter");
        return;
    }

    const todoListFilter: HTMLInputElement =
        document.getElementById("todoFilter") as HTMLInputElement;

    const todoListFilterText =
        todoListFilter.value.toUpperCase();

    todoListHtml.childNodes.forEach((item) => {
        let itemText: string | null = item.textContent;

        if (itemText !== null) {
            itemText = itemText.toUpperCase();

            if (itemText.startsWith(todoListFilterText)) {
                (item as HTMLLIElement).style.display = "list-item";
            } else {
                (item as HTMLLIElement).style.display = "none";
            }
        }
    });
}

// Remove an individual todo item
function removeTodoListItem(itemToRemove: string): void {
    console.log("Item to remove: ", itemToRemove);

    todoList = todoList.filter((value: string) => {
        return value !== itemToRemove;
    });

    updateTodoList();
    filterTodoList();
}

// Remove all todo items
function removeAllTodos(): void {
    console.log("Removing all todo items");

    // Clear the array
    todoList = [];

    // Clear the filter
    const todoFilter: HTMLInputElement =
        document.getElementById("todoFilter") as HTMLInputElement;

    todoFilter.value = "";

    // Refresh the displayed list
    updateTodoList();

    console.log("All todo items removed");
}
