<template>
  <div id="app">
    <div class="task-manager">
      <header class="task-manager__header">
        <h1><i class="fas fa-tasks"></i> Tasko</h1>
      </header>

      <task-form
        :edit-task="taskToEdit"
        @add-task="addTask"
        @update-task="updateTask"
        @cancel-edit="cancelEdit"
      ></task-form>

      <task-stats :tasks="tasks"></task-stats>

      <task-list
        :tasks="tasks"
        @toggle-completed="toggleTaskCompleted"
        @edit-task="editTask"
        @delete-task="deleteTask"
      ></task-list>
    </div>
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import TaskStats from "./components/TaskStats.vue";

export default {
  name: "App",
  components: {
    TaskForm,
    TaskList,
    TaskStats,
  },
  data() {
    return {
      tasks: [],
      taskToEdit: null,
      localStorageKey: "vue-task-manager-tasks",
    };
  },
  created() {
    // Load tasks from local storage when the app starts
    this.loadTasksFromStorage();
  },
  methods: {
    addTask(newTask) {
      this.tasks.push(newTask);
      this.saveTasksToStorage();
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        // Replace the task at the found index
        this.tasks.splice(index, 1, updatedTask);
        this.saveTasksToStorage();
      }
      this.taskToEdit = null;
    },
    toggleTaskCompleted({ id, completed }) {
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        // Create a new object to avoid mutating the original
        const updatedTask = { ...this.tasks[index], completed };
        this.tasks.splice(index, 1, updatedTask);
        this.saveTasksToStorage();
      }
    },
    editTask(task) {
      this.taskToEdit = task;
      // Scroll to the form
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    cancelEdit() {
      this.taskToEdit = null;
    },
    deleteTask(taskId) {
      if (confirm("Are you sure you want to delete this task?")) {
        const index = this.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          this.tasks.splice(index, 1);
          this.saveTasksToStorage();

          // If we're editing this task, clear the edit state
          if (this.taskToEdit && this.taskToEdit.id === taskId) {
            this.taskToEdit = null;
          }
        }
      }
    },
    saveTasksToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
    },
    loadTasksFromStorage() {
      const savedTasks = localStorage.getItem(this.localStorageKey);
      if (savedTasks) {
        try {
          this.tasks = JSON.parse(savedTasks);
        } catch (e) {
          console.error("Failed to parse tasks from local storage:", e);
          this.tasks = [];
        }
      }
    },
    clearAllTasks() {
      if (confirm("Are you sure you want to delete all tasks?")) {
        this.tasks = [];
        this.saveTasksToStorage();
      }
    },
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
