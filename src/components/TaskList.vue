<template>
  <div class="task-manager__list">
    <div class="task-filter">
      <div class="task-filter__item">
        <select v-model="filter.status" class="form-control">
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div class="task-filter__item">
        <select v-model="filter.priority" class="form-control">
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div class="task-filter__item">
        <select v-model="filter.sort" class="form-control">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>

    <div class="card">
      <transition-group name="task-list" tag="div">
        <task-item
          v-for="task in filteredAndSortedTasks"
          :key="task.id"
          :task="task"
          @toggle-completed="toggleTaskCompleted"
          @edit-task="editTask"
          @delete-task="deleteTask"
        ></task-item>
      </transition-group>

      <div v-if="filteredAndSortedTasks.length === 0" class="task-manager__empty">
        <i class="fas fa-clipboard-list fa-3x mb-3"></i>
        <h3>No tasks found</h3>
        <p>{{ emptyStateMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: {
        status: "all",
        priority: "all",
        sort: "newest",
      },
    };
  },
  computed: {
    filteredAndSortedTasks() {
      // First filter the tasks
      let result = [...this.tasks];

      // Filter by status
      if (this.filter.status !== "all") {
        const isCompleted = this.filter.status === "completed";
        result = result.filter((task) => task.completed === isCompleted);
      }

      // Filter by priority
      if (this.filter.priority !== "all") {
        result = result.filter((task) => task.priority === this.filter.priority);
      }

      // Sort the tasks
      result.sort((a, b) => {
        switch (this.filter.sort) {
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "dueDate":
            // Tasks with no due date come last
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          case "priority": {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          default:
            return 0;
        }
      });

      return result;
    },
    emptyStateMessage() {
      if (this.tasks.length === 0) {
        return "Add your first task to get started!";
      }

      if (this.filter.status !== "all" || this.filter.priority !== "all") {
        return "No tasks match your current filters.";
      }

      return "Your task list is empty.";
    },
  },
  methods: {
    toggleTaskCompleted({ id, completed }) {
      this.$emit("toggle-completed", { id, completed });
    },
    editTask(task) {
      this.$emit("edit-task", task);
    },
    deleteTask(taskId) {
      this.$emit("delete-task", taskId);
    },
  },
};
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Most styles are imported from the main SCSS files
</style>