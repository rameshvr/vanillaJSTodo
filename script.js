(function() {
  var addForm = document.querySelector("#formAddToDo");
  var List = document.querySelector("ul#toDoList");

  addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTodo(List, this.elements.newToDo.value);
  });

  // fetch all todo from LS
  var getToDos = function(List, event) {
      if (localStorage.length) {
        if (event == "initialLoad") {
          for (var key in localStorage) {
            appendToList(List, key);
          }
        } else {
          // diff DOM and LS and update one change
        }
      } else {
        console.info("You do not have any Todos!");
      }
    },

    // toggle linethroug in DOM for the given id
    toggleStrikeClass = function(id){
      var el = document.querySelector(".t"+id +" span.checked");
      if(!el){
        var el = document.querySelector(".t"+id +" span.null");
        el.className = "checked";
      }
      else{
        el.className = "null";
      }
    },

    getPriorityDom = function(priority){
      var el = '';
      for (var i=0; i<priority; i++){
        el += '<span class="star">!</span>';
      }
      return el;
    },

    // add todo to DOM
    appendToList = function(List, key) {
      var todo = JSON.parse(localStorage.getItem(key)),
      checked = todo.status == "done" ? "checked" : null,
      priority = getPriorityDom(todo.priority);

      List.innerHTML +=
        '<li class=t'+
        key+'><input '+checked+' type="checkbox" name="markDone" onclick= window.updateStatus('+key+')' +
        '><div class="priority">'+priority+'</div><span class='+checked+'>'+todo.value +
        '</span><input class="deleteTodo" type="button" value="delete" onclick="window.delete(' +
        key +
        ')"></li>';
    },


    // add ToDo from both DOM and LS
    addTodo = function(List, value) {
      const maximumToDos = 1000,
        key = Math.ceil(Math.random() * maximumToDos);
      var toDo = {
        value: value,
        status: false,
        priority: 2
      };
      localStorage.setItem(key, JSON.stringify(toDo));
      appendToList(List, key);
    },

    // update ToDo from both DOM and LS
    updateStatus = function(id) {
      var todo = JSON.parse(localStorage.getItem(id));
      status = todo.status;
      todo.status = (status == "false") ? "done" : "false";
      toggleStrikeClass(id);
      localStorage.setItem(id, JSON.stringify(todo));
    },

    // delete ToDo from both DOM and LS
    deleteTodo = function(id) {
      var el = document.querySelector(".t"+id);
      List.removeChild(el);
      localStorage.removeItem(id);
    };
  
  // load all todos on initial load
  getToDos(List, "initialLoad");
  
  // expose limited functions to window scope
  window.delete = deleteTodo;
  window.updateStatus = updateStatus;
})();
