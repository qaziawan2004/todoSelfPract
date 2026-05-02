let inp = document.getElementById("input");
let ul = document.getElementById("ul");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

todos = todos.filter(item => item && item.id && item.text);

function submit() {

    if (inp.value.trim() === "") return;

    let obj = {
        id: Date.now(),
        text: inp.value,
        isCompleted: false
    };

    todos.push(obj);

    localStorage.setItem("todos", JSON.stringify(todos));

    inp.value = "";

    getTodo();
}

function getTodo() {
    ul.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {

        // ✅ Safety check
        if (!todos[i]) continue;

        let id = todos[i].id;

        let li = document.createElement("li");
        li.innerText = todos[i].text;

        // DELETE BUTTON
        let dlt = document.createElement("button");
        dlt.innerText = "🗑️";

        dlt.addEventListener("click", function () {
            dltTodo(id);
        });

        // UPDATE BUTTON
        let update = document.createElement("button");
        update.innerText = "Update";

        update.addEventListener("click", function () {
            upDateTodo(id);
        });

        let pnd = document.createElement("button");

        if (todos[i].isCompleted === true) {
            pnd.innerText = "✅";
        } else {
            pnd.innerText = "...";
        }

        pnd.addEventListener("click", function () {
            pndTodo(id);
        });


        li.appendChild(dlt);
        li.appendChild(update);
        li.appendChild(pnd);
        ul.appendChild(li);
    }
}

function dltTodo(id) {

    let newTodo = [];

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id !== id) {
            newTodo.push(todos[i]);
        }
    }

    todos = newTodo;

    localStorage.setItem("todos", JSON.stringify(todos));

    getTodo();
}

function upDateTodo(id) {

    for (let i = 0; i < todos.length; i++) {

        if (todos[i].id === id) {

            let updated = prompt("Enter updated value");

            if (updated && updated.trim() !== "") {
                todos[i].text = updated;
            }
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    getTodo();
}

function pndTodo(id) {

    for (let i = 0; i < todos.length; i++) {

        if (todos[i].isCompleted === true) {
            todos[i].isCompleted = false;
        } else {
            todos[i].isCompleted = true;
        };
    };

    localStorage.setItem("todos", JSON.stringify(todos));

    getTodo();
};

getTodo();