/*

  For educational purposes we have wrote this app using
  native DOM interfaces. RE:DOM library is used as a
  convenience layer to remove DOM boilerplate.

  Example HTML:

  <div class="message">hello DOM</div>

  How to create with DOM:

    const div = document.createElement('div');
    div.className = 'message';
    div.appendChild(
      document.createTextNode('hello DOM')
    );

  How to create with RE:DOM: 

    import { el, text, list } from 'https://redom.js.org/redom.es.js';
    const div = el('div.message', [
      text('hello DOM')
    ]);

  Besides these simple convenience functions, everything
  you write here is just JavaScript with browser DOM.

*/
import { el, text, list } from 'https://redom.js.org/redom.es.js';

class Todo {
  constructor () {
    this.el = el('div.todo', [
      this.titleElem = el('div.title')
    ]);
  }
  update (i) {
    this.titleElem.textContent = i.text;
  }
}

class NewTodo {
  constructor ({ todo, addTodo }) {
    const titleElem = el('input', {
      type: 'text',
      value: todo.title,
      placeholder: 'Add new todo'
    });

    const addElem = el('input', {type: 'submit', value: 'Add'}, 'key');
    addElem.onclick = e => {
      e.preventDefault();
      addTodo({ text: titleElem.value, done: false });
      titleElem.value = '';
    };

    this.el = el('form.new-todo', 
      titleElem,
      addElem
    );
  }
}

export class App {
  constructor ({todos}) {
    this.todoData = todos;

    this.todosElem = list('div.todos', Todo);
    this.todosElem.update(todos);
    this.addTodo = function(todo) {
      if(todo.text.length > 0) {
        this.todoData.push(todo);
        this.todosElem.update(this.todoData);
        // TODO: update storage
          localStorage.setItem('todos', JSON.stringify(this.todoData));
      }
    };
    
    this.el = el('div.app', 
      this.todosElem,
      new NewTodo({ todo: {title: ''}, addTodo: this.addTodo.bind(this) })
    );
  }
}
