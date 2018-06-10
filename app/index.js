import { mount } from 'https://redom.js.org/redom.es.js';
import { App } from './app.js';

// TODO: init storage
const todos = localStorage.getItem('todos');
if(!todos){
  localStorage.setItem('todos', '[]');
}

// Mount app
const app = new App({
  todos: JSON.parse(localStorage.getItem('todos')), // TODO: load todos from storage
  // TODO: pass storage instance to the app
});
const mainElem = document.body.getElementsByTagName('main')[0];
mount(mainElem, app);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(
      function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function(err) {
        console.error('ServiceWorker registration failed: ', err);
      }
    );
  });
}
