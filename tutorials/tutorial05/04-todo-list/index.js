function addTodo() {
    const input = document.querySelector("#todoInput");

    const todoText = input.value;

    const todoList = document.querySelector("#todoList");

    todoList.insertAdjacentHTML("beforeend", "<li>" + todoText + "</li>");
}