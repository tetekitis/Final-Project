var todoList = {                  //creates an object where our array and methods are stored.
  todos: [],                      //creates an array where our list items are stored.
  addTodo: function(todoText) {   //creates a method to add todos with a parameter that determines the text property of each item.
    this.todos.push({             //intructs the todos array to add an object to the array.
      todoText: todoText,         //is the text property of the object, and the text value
      completed: false            //sets the completed object property value to default false setting
    });                           
  },                              
  changeTodo: function(position, todoText) {  //creates a method with 2 parameters of index and text value
    this.todos[position].todoText = todoText; //accesses a specified index and changes the textvalue to the input passed as second paramter.
  },                                          
  deleteTodo: function(position) {            //creates method with one index parameter
    this.todos.splice(position, 1);           //accesses array at specified position and deletes one object
  },                                         
  toggleCompleted: function(position) {       //create function with one parameter of array position
    var todo = this.todos[position];          //create variable for todoList's todos array's index position
    todo.completed = !todo.completed;         //flip boolean value of the object's completed property to opposite
  },
  toggleAll: function() {                     //create function with no parameter
    var totalTodos = this.todos.length;       //create variable equal to the amount of items in the array
    var completedTodos = 0;                   //create variable equal to number of items in the array with completed property true
    
    
  this.todos.forEach(function(todo) {         //iterates over each item in todoList array
    if (todo.completed === true) {            //checks to see if completed property of item is true
      completedTodos++;                       // increases the completedTodos varibale incrementally by 1, if true
    }
  });
    
    this.todos.forEach(function(todo) {      //iterate over each item in array
     if (completedTodos === totalTodos) {    //checks if all completed properties are true
       todo.completed = false;               //swiches each completed property to false
     }else {                                 //alternate course of action if completed/total variables do not macth
       todo.completed = true;                //changes each completed property to true
     }
    });
   
  }
};

var handlers = {                                                        //create object for DOM functions
  addTodo: function() {                                                //create function that handles addToDo html interaction
    var addTodoTextInput = document.getElementById('addTodoTextInput');//create variable to store input from html side
    todoList.addTodo(addTodoTextInput.value);                         //accesses the todoList object and calls addToDo method and passes input as a paramter
    addTodoTextInput.value = '';                                     //clears the input field after input has been added
    view.displayTodos();                                             //displays updated list on screen
  },
  changeTodo: function() {                                                                //create function to change todos
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');     //create variable to store the index position imput of the item you want to change
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');             //create variable to store the new text input of the item you want to change
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);//accesses todoList object, calls the changeTodo method and passes your imput as parameters
    changeTodoPositionInput.value = '';                                                   //clears position field
    changeTodoTextInput.value = '';                                                       //clears text change field
    view.displayTodos();                                                                  //display the updated list
  },
  deleteTodo: function(position) {                                                        //create delete function with position parameter
    todoList.deleteTodo(position);                                                        //access todoList object and call deleteTodo method
    view.displayTodos();                                                                  //display updated list
  },
  toggleCompleted: function() {                                                                //create function for toggling individual items
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');//create variable to store numerical input of which item you are targeting
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);                      //access the todoList object and call the toggleCompleted method passing the input value as a  parameter
    toggleCompletedPositionInput.value = '';                                                   //clear input field
    view.displayTodos();                                                                       //display updated list
  },
  toggleAll: function() {                                         //create function to toggle all todos
    todoList.toggleAll();                                        //access todoList object and call the toggleAll method from that object
    view.displayTodos();                                        //display updated list
  }  
};

var view = {                                            //create new object for displaying todos
  displayTodos: function() {                           //create function that displays todos
    var todosUl = document.querySelector('ul');        //create variable that stores/targets all unordered list elements
    todosUl.innerHTML = '';                            //sets unordered list element to blank
    
    todoList.todos.forEach(function(todo, position) {  //accesses todoList array and iterates over each item.  Todo parameter refers to the value of current item, position refers to index of current item
      var todoLi = document.createElement('li');      //creates a variable that stores newly created list items
      var todoTextWithCompletion = '';               //creates a variable that will store string indicating whether an item is completed or not

      if (todo.completed === true) {                    //checks if each item is completed
        todoTextWithCompletion = '(x) ' + todo.todoText;//assigns item visually as completed 
      } else {                                          //alternate course of action if conditional not met
        todoTextWithCompletion = '( ) ' + todo.todoText;//assigns item visually as not completed 
      }
      
      todoLi.id = position;                            //assigns each list item a index value based on parameter passed from forEach
      todoLi.textContent = todoTextWithCompletion;     //assigns list item the text value of (x) or ( ) from if statement
      todoLi.appendChild(this.createDeleteButton());   //creates a delete button for each list item, each iteration
      todosUl.appendChild(todoLi);                     //creates list items inside unordered list each iteration
    },this );                                   //tells browser to treat callback function(forEach) as a function on the view object, given as a thisArg 
  },
  createDeleteButton: function() {                      //function to create delete buttons
    var deleteButton = document.createElement("button");//create variable to store newly created delete button
    deleteButton.textContent = "Delete";                //creates the actual text seen on the button
    deleteButton.className = "deleteButton";            //assigns the delete button a class designation
    return deleteButton;                                //returns delete button so function won't return undefined
  },
  setupEventListeners: function() {                     //create function that adds event listeners to unorder list element
    var todosUl = document.querySelector("ul");         //creates variable that store value of unordered list element

    todosUl.addEventListener("click", function(event) { //adds an event listener to hear mouse clicks, passes event as parameter
    
    var elementClicked = event.target;                 //gets the element that was clicked on, storing it as a variable
   
    if (elementClicked.className = "deleteButton") {  //checks to see if element clicked was a delete button
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));//access the handlers object, calls delete function, changes data type, and passes the element clicked by it's parent node's id.
      }
    });
  }
};

view.setupEventListeners();                          //calls the setUpEventListeners function so it runs.












