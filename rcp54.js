const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector(".js-ex"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos";
let toDos = [];



function deleteToDo (event){
    const btn =event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const del = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    del.innerText = "v"
    del.addEventListener("click", deleteToDo)
    span.innerText = text
    li.appendChild(del);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="hi";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("click", handleSubmit)
}

init();