document.addEventListener('DOMContentLoaded', () => {
  const formTask = document.getElementById('formTask');
  const tasksContainer = document.getElementById('tasks');

  // Initialize tasks array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to render tasks
  const renderTasks = () => {
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('card', 'mb-3');
      taskElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <button class="btn btn-danger btn-sm" data-index="${index}">Delete</button>
        </div>
      `;
      tasksContainer.appendChild(taskElement);
    });
  };

  // Function to save tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Event listener for form submission
  formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Add new task to the tasks array
    tasks.push({ title, description });

    // Save tasks to localStorage and render them
    saveTasks();
    renderTasks();

    // Clear the form
    formTask.reset();
  });

  // Event listener for delete buttons
  tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
      const index = e.target.getAttribute('data-index');
      tasks.splice(index, 1);

      // Save tasks to localStorage and render them
      saveTasks();
      renderTasks();
    }
  });

  // Initial render of tasks
  renderTasks();
});
