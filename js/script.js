'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
if (!localStorage.getItem('currentData')) {
  localStorage.setItem('currentData', JSON.stringify(todoData));
} else {
  todoData = JSON.parse(localStorage.currentData);
}
const render = function () {
  localStorage.currentData = JSON.stringify(todoData);

  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const btnTodoCompleted = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !(item.completed);
      render();
    });

    btnTodoRemove.addEventListener('click', function () {
      todoData.pop(item);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value.trim() !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    headerInput.value = '';
    render();
  }
});

render();