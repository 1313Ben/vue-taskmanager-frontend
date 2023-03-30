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
    tasktoedit: {},
    action: 'create',
    message: ""
  },
  computed: {
    completedTasks: function () {
      return this.tasks.filter(item => item.completed == true);
    },
    todoTasks: function () {
      return this.tasks.filter(item => item.completed == false);
    },
    nextId: function () {
      return(this.tasks.sort(function(a,b){return a.id - b.id}))[this.tasks.length - 1].id + 1
    }
  },
  methods: {
    clear: function () {
      this.tasktoedit = {}
      this.action = 'create'
      this.message = ''
    },
    toggleDone: function (event, id) {
      event.stopImmediatePropagation();
      //console.log(event);
      //console.log(id);
      let task = this.tasks.find(item => item.id == id)
      if (task) {
        task.completed = !task.completed;
        // console.log("task toggled");
        this.message = `Task ${id} updated`
      }
    },
    createTask: function () {
      if (!this.tasktoedit.completed) {
        this.tasktoedit.completed = false
      } else {
        this.tasktoedit.completed = true
      }
      let taskId = this.nextId
      let newTask = Object.assign({}, this.tasktoedit)
      newTask.id = taskId
      this.tasks.push(newTask)
      this.clear()
      this.message = `Task ${taskId} created`
    },
    editTask: function (event, id) {
      this.action = 'edit'
      let task = this.tasks.find(item => item.id == id);

      if (task) {
        this.tasktoedit = {id: id, name: task.name, description: task.description, completed: task.completed}
        console.log(this.tasktoedit);
      }
    },
    updateTask: function (event, id) {
      event.stopImmediatePropagation();
      let task = this.tasks.find(item => item.id == id)

      if (task) {
        task.name = this.tasktoedit.name
        task.description = this.tasktoedit.description
        task.completed = this.tasktoedit.completed
        this.message = `Task ${id} updated`
      }
    },
    deleteTask: function (event, id) {
      event.stopImmediatePropagation();
      //console.log(event);
      //console.log(id);
      let taskIndex = this.tasks.findIndex(item => item.id == id);

      if (taskIndex > -1) {
        this.$delete(this.tasks, taskIndex)
        //console.log("task deleteed");
        this.message = `Task ${id} deleted`
      }
    }
  }
})
