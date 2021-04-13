  const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
  }
  
  
  const list = document.getElementById('todo-list')
  const itemCountSpan = document.getElementById('item-count')
  const uncheckedCountSpan = document.getElementById('unchecked-count')
  
  let todos = 0;
  let pendingTodos = 0;

  function handleOnChange(){
    // el this representa el objeto que llama al metodo
    // en este caso seria el checkbox que es clickeado
    console.log('change', this.checked);
    
    if(this.checked) pendingTodos--;
    else pendingTodos++;

    renderCounters();
  }

  function handleDelete(){
    //el parentNode devuelve el nodo padre del objeto que llama a la funcion
    const parent = this.parentNode;

    //el firstElementChild devuelve el primer nodo hijo.
    //tambien se puede solucionar con el .children[0]
    if(!parent.firstElementChild.checked) pendingTodos--;
    todos--;

    parent.remove();
  
    renderCounters();
  }

  function crearTarea(name){
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    //se le puede asignar dinamicamente el handler 
    //para el onchange o cualquier evento
    //checkbox.onclick funciona tambien
    checkbox.onchange = handleOnChange;

    checkbox.className = classNames.TODO_CHECKBOX;

    const span = document.createElement('span');
    span.className = classNames.TODO_TEXT;
    span.setAttribute('editable', true);
    span.innerHTML = name;

    const del = document.createElement('button');
    del.className = classNames.TODO_DELETE;
    del.innerHTML = 'X';
    del.onclick = handleDelete;

    const li = document.createElement('li');
    li.className = classNames.TODO_ITEM;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);

    console.log(li);

    return li;
  }

  //funcion que renderiza los counters
  function renderCounters(){
    itemCountSpan.innerHTML = todos.toString();
    uncheckedCountSpan.innerHTML = pendingTodos.toString();
  }

  function addTodo() {
    //prompt para pedirle un input al usuario
    let nombreTarea = prompt('Nombre de tarea');
    if(nombreTarea){
      const todo = crearTarea(nombreTarea);
      if(todo){
        todos++;
        pendingTodos++;
      }
      list.appendChild(todo);
      renderCounters();
    }
  }