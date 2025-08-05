'use strict';

  const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Завантаження з localStorage
    window.onload = () => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        tasks = JSON.parse(stored);
        renderTasks();
      }
    };

    // Збереження в localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Рендеринг завдань
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task' + (task.done ? ' done' : '');

        const left = document.createElement('div');
        left.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        checkbox.addEventListener('change', () => {
          tasks[index].done = checkbox.checked;
          saveTasks();
          renderTasks();
        });

        const span = document.createElement('span');
        span.textContent = task.text;

        left.appendChild(checkbox);
        left.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });

        taskDiv.appendChild(left);
        taskDiv.appendChild(deleteBtn);

        taskList.appendChild(taskDiv);
      });
    }

    // Додавання нового завдання
    addBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, done: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    });