const todos = [];
const RENDER_EVENT = "render-todo";

function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
  
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));

    function generateId() {
        return +new Date();
    }
     
     
    function generateTodoObject(id, task, timestamp, isCompleted) {
        return {
            id,
            task,
            timestamp,
            isCompleted
        }
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById("todos");
    uncompletedTODOList.innerHTML = "";
   
    const completedTODOList = document.getElementById("completed-todos");
    completedTODOList.innerHTML = "";
   
    for(todoItem of todos){
        const todoElement = makeTodo(todoItem);
     
        if(todoItem.isCompleted == false)
            uncompletedTODOList.append(todoElement);
        else
            completedTODOList.append(todoElement);
    }
});

function makeTodo(todoObject) {
 
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.task;
  
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = todoObject.timestamp;
  
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);
  
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    if(todoObject.isCompleted){
 
        const undoButton = document.createElement("button");
        undoButton.classList.add("undo-button");
        undoButton.addEventListener("click", function () {
            undoTaskFromCompleted(todoObject.id);
        });
   
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-button");
        trashButton.addEventListener("click", function () {
            removeTaskFromCompleted(todoObject.id);
        });
   
        container.append(undoButton, trashButton);
    } else {
   
   
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");
        checkButton.addEventListener("click", function () {
            addTaskToCompleted(todoObject.id);
        });
   
        container.append(checkButton);
    }

    return container;
}

function addTaskToCompleted(todoId) {
 
    const todoTarget = findTodo(todoId);
    if(todoTarget == null) return;
  
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
} 

function findTodo(todoId){
    for(todoItem of todos){
        if(todoItem.id === todoId){
            return todoItem
        }
    }
    return null
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if(todoTarget === -1) return;
  todos.splice(todoTarget, 1);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoTaskFromCompleted(todoId){
 
 
  const todoTarget = findTodo(todoId);
  if(todoTarget == null) return;
 
 
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodoIndex(todoId) {
   for(index in todos){
       if(todos[index].id === todoId){
           return index
       }
   }
   return -1
}
















































































































































// const UNCOMPLETED_LIST_TODO_ID = "todos";
// const COMPLETED_LIST_TODO_ID = "completed-todos";
// const TODO_ITEMID = "itemId";

// function makeTodo(data /* string */, timestamp /* string */, isCompleted /* boolean */) {

//     const textTitle = document.createElement("h2");
//     textTitle.innerText = data;

//     const textTimestamp = document.createElement("p");
//     textTimestamp.innerText = timestamp;

//     const textContainer = document.createElement("div");
//     textContainer.classList.add("inner")
//     textContainer.append(textTitle, textTimestamp);

//     const container = document.createElement("div");
//     container.classList.add("item", "shadow")
//     container.append(textContainer);

//     if (isCompleted) {
//         container.append(
//             createUndoButton(),
//             createTrashButton()
//         );
//     } else {
//         container.append(
//             createCheckButton()
//         );
//     }

//     return container;
// }

// function createUndoButton() {
//     return createButton("undo-button", function (event) {
//         undoTaskFromCompleted(event.target.parentElement);
//     });
// }

// function createTrashButton() {
//     return createButton("trash-button", function (event) {
//         removeTaskFromCompleted(event.target.parentElement);
//     });
// }

// function createCheckButton() {
//     return createButton("check-button", function (event) {
//         addTaskToCompleted(event.target.parentElement);
//     });
// }

// function createButton(buttonTypeClass /* string */, eventListener /* Event */) {
//     const button = document.createElement("button");
//     button.classList.add(buttonTypeClass);
//     button.addEventListener("click", function (event) {
//         eventListener(event);
//         event.stopPropagation();
//     });
//     return button;
// }

// function addTodo() {
//     const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
//     const textTodo = document.getElementById("title").value;
//     const timestamp = document.getElementById("date").value;

//     const todo = makeTodo(textTodo, timestamp, false);
//     const todoObject = composeTodoObject(textTodo, timestamp, false);
    
//     todo[TODO_ITEMID] = todoObject.id;
//     todos.push(todoObject);

//     uncompletedTODOList.append(todo);
//     updateDataToStorage();
// }

// function addTaskToCompleted(taskElement /* HTMLELement */) {
//     const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
//     const taskTitle = taskElement.querySelector(".inner > h2").innerText;
//     const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

//     const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    

//     const todo = findTodo(taskElement[TODO_ITEMID]);
//     todo.isCompleted = true;
//     newTodo[TODO_ITEMID] = todo.id;

//     listCompleted.append(newTodo);
//     taskElement.remove();

//     updateDataToStorage();
// }

// function removeTaskFromCompleted(taskElement /* HTMLELement */) {

//     const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
//     todos.splice(todoPosition, 1);

//     taskElement.remove();
//     updateDataToStorage();
// }

// function undoTaskFromCompleted(taskElement /* HTMLELement */) {
//     const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
//     const taskTitle = taskElement.querySelector(".inner > h2").innerText;
//     const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
    
//     const newTodo = makeTodo(taskTitle, taskTimestamp, false);

//     const todo = findTodo(taskElement[TODO_ITEMID]);
//     todo.isCompleted = false;
//     newTodo[TODO_ITEMID] = todo.id;

//     listUncompleted.append(newTodo);
//     taskElement.remove();
    
//     updateDataToStorage();
// }

// function refreshDataFromTodos() {
//     const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
//     let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

//     for(todo of todos){
//         const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
//         newTodo[TODO_ITEMID] = todo.id;

//         if(todo.isCompleted){
//             listCompleted.append(newTodo);
//         } else {
//             listUncompleted.append(newTodo);
//         }
//     }
// }