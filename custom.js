//creat input form
const form = document.createElement('form');
const todoApp = document.createElement('div');
const addInput = document.createElement('input');
const addBtn = document.createElement('button');

todoApp.classList.add('todo-app');
form.classList.add('input-form');
addBtn.innerHTML = 'Add';
addInput.setAttribute('type', 'text');
addBtn.setAttribute('type', 'submit');

//creat select form
const select = document.createElement('select');
var options = ['all', 'complate', 'uncomplate'];
options.forEach(element => {
    const option = document.createElement('option');
    option.setAttribute('value',element);
    option.innerHTML = element;
    select.appendChild(option);
});
select.style.textTransform  = 'capitalize';
form.append(addInput, addBtn, select);

//creat todo list
const todoList = document.createElement('div');
todoList.classList.add('todo-list');
todoApp.prepend(form, todoList);
document.body.prepend(todoApp);

// event handler
document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', dltTodo);
todoList.addEventListener('click', complateTodo);
select.addEventListener('click', filterTodo);


//check is todos in localStorage
let todos;
function isTodos(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
}

// add todo
function addTodo(e){
    e.preventDefault()
    var newtodo = addInput.value;
    if(( newtodo.trim() === '' )) return
    isTodos()
    var data = {
        'newTodo': newtodo,
        'complate': false
    }
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
    addInput.value = "";
    getTodos()
}

// get todo
function getTodos(){
    isTodos()
    todoList.innerHTML = ''
     todos.forEach( function(todo){
        todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        
        if(todo.complate == true){
            todoDiv.classList.add('complate');
        }else{
            todoDiv.classList.remove('complate');
        }

        var li = document.createElement('li');
        li.innerHTML = todo.newTodo;
        todoDiv.appendChild(li);
        
        var dltBtn = document.createElement('button');
        dltBtn.classList.add('dlt-btn');
        dltBtn.innerHTML = '<i class="fa fa-trash"></i>';
        todoDiv.appendChild(dltBtn);

        var complateBtn = document.createElement('button');
        complateBtn.classList.add('complate-btn');
        complateBtn.innerHTML = '<i class="fa fa-check"></i>';

        todoDiv.appendChild(complateBtn);
        
        todoList.prepend(todoDiv);
     })
}

// filter todo
function filterTodo(e){
    var todo = todoList.childNodes
    todo.forEach(element => {
        if(e.target.value === 'all'){
            element.style.display = 'flex';
        }
        if(e.target.value === 'complate'){
            if(element.classList.contains('complate')){
                element.style.display = 'flex';
                console.log('todos');
            }else{
                element.style.display = 'none';
            }
        }
        if(e.target.value === 'uncomplate'){
            if(element.classList.contains('complate')){
                element.style.display = 'none';
            }else{
                element.style.display = 'flex';
            }
        }
    });
    
}

// complate todo
function complateTodo(e){
    var item = e.target;

    var btnParentElement;
    if(item.hasChildNodes()){
        btnParentElement = item;
    }else{
        btnParentElement = item.parentElement;
    }
    var todoDiv = btnParentElement.parentElement;
    if(btnParentElement.classList.contains('complate-btn')){
        todoDiv.classList.toggle('complate');

        isTodos()
    
        const todoItem = todoDiv.childNodes[0]
        todos.forEach( function(e){
            if(todoItem.innerHTML === e.newTodo){
                if(todoDiv.classList.contains('complate')){
                    e.complate = true
                }else{
                    e.complate = false
                }
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        })
    }

}

// delete todo
function dltTodo(e){
    const item = e.target
    var btnParentElement;
    if(item.hasChildNodes()){
        btnParentElement = item
    }else{
        btnParentElement = item.parentElement
    }

    isTodos()
    var todoDiv = btnParentElement.parentElement;
    if(btnParentElement.classList.contains('dlt-btn')){
        todoDiv.classList.add('swipe-right')
        todoDiv.addEventListener('transitionend', function(){
            getTodos()
            todos.forEach( function(e){
                if(todoDiv.childNodes[0].innerHTML === e.newTodo){
                    todos.splice(todos.indexOf(e), 1)
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            })
        })
    }
    
}