var app = new Vue({
  el: '#app',
  components: {
    'task': {
      props: ['task'],
      template: `
    <div class="ui segment task" v-bind:class="task.completed ? 'done' : 'todo' "> 
      <div class="ui grid">
        <div class="left floated twelve wide column">
          <div class="ui checkbox">
            <input type="checkbox" name="task" v-on:click="this.app.toggleDone($event, task.id)" :checked="task.completed" >
            <label>{{task.name}} <span class="description">{{task.description}}</span></label>
          </div>
        </div>
        <div class="right floated three wide column">
        <i class="icon pencil blue" alt="Edit" v-on:click="this.app.editTask($event, task.id)"></i>
        <i class="icon trash red" alt="Delete" v-on:click="this.app.deleteTask($event, task.id)"></i>
        </div>
      </div>
    </div>
    `}
  },
  data: {
    tasks: [
      { id: 1, name: 'Todo 1', description: 'This is a todo', completed: false},
      { id: 2, name: 'Todo 2', description: 'This is a todo', completed: true},
      { id: 3, name: 'Todo 3', description: 'This is a completed todo', completed: true},
      { id: 4, name: 'Todo 4', description: 'This is a another completed todo', completed: true}
    ],
    tasktoedit: {}
  },
  computed: {
    completedTasks: function () {
      return this.tasks.filter(item => item.completed == true);
    },
    todoTasks: function () {
      return this.tasks.filter(item => item.completed == false);
    }
  },
  methods: {
    toggleDone: function (event, id) {
      event.stopImmediatePropagation();
      //console.log(event);
      //console.log(id);
      let task = this.tasks.find(item => item.id == id)
      if (task) {
        task.completed = !task.completed;
        // console.log("task toggled");
      }
    },
    editTask: function (event, id) {
      let task = this.tasks.find(item => item.id == id);

      if (task) {
        this.tasktoedit = {id: id, name: task.name, description: task.description, completed: task.completed}
        console.log(this.tasktoedit);
      }
    },
    updateTask: function (event, id) {
      event.stopImmediatePropagation();
      event.preventDefault();
      let task = this.tasks.find(item => item.id == id)

      if (task) {
        task.name = this.tasktoedit.name
        task.description = this.tasktoedit.description
        task.completed = this.tasktoedit.completed
      }
    },
    deleteTask: function (event, id) {
      event.stopImmediatePropagation();
      //console.log(event);
      //console.log(id);
      let taskIndex = this.tasks.findIndex(item => item.id == id);

      if (taskIndex > -1) {
        this.$delete(this.tasks, taskIndex)
        console.log("task deleteed");
      }
    }
  }
})
