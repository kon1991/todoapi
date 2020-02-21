$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);

    $("#todoInput").keypress(function(){
        if(event.which == 13) {
            console.log("YOU HIT ENTER");
            createTodo();
        }
    });

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $('.list').on('click', 'li', function(){
        console.log($(this).data('id'));
        
        updateTodo($(this));
    })
});

function addTodos(todos) {
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">'+todo.name+' <span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed)
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
    console.log(todo.name);
}

function createTodo() {
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
        console.log(newTodo.name);
    });
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
}

function updateTodo(todo) {
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = todo.data('completed');
    var updateData = {completed: !isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData 
    }
    )
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed') = !todo.data('completed');
    })
}