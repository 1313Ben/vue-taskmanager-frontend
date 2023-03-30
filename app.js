var app = new Vue({
  el: '#app',
  data: {
    tasks: [
      { id: 1, name: 'Todo 1', description: 'This is a todo', completed: false},
      { id: 2, name: 'Todo 2', description: 'This is a todo', completed: true},
      { id: 3, name: 'Todo 3', description: 'This is a completed todo', completed: false},
      { id: 4, name: 'Todo 4', description: 'This is a another completed todo', completed: true}
    ],
    message: 'Hello Vue!'
  },
  computed: {
    completedTasks: function () {
      return this.tasks.filter(item => item.completed == true);
    },
    todoTasks: function () {
      return this.tasks.filter(item => item.completed == false);
    }
  }
})
