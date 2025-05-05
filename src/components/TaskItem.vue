<template>
  <div class="task-item">
    <div class="task-item__checkbox">
      <input
        type="checkbox"
        :id="'task-' + task.id"
        :checked="task.completed"
        @change="toggleCompleted"
      />
    </div>

    <div class="task-item__content">
      <h3
        class="task-item__title"
        :class="{ 'task-item__title--completed': task.completed }"
      >
        {{ task.title }}
        <span
          v-if="task.priority"
          class="task-item__priority"
          :class="`task-item__priority--${task.priority}`"
        >
          <i class="fas" :class="priorityIcon"></i>
        </span>
      </h3>

      <p v-if="task.description" class="task-item__description">
        {{ task.description }}
      </p>

      <div
        v-if="task.dueDate"
        class="task-item__due-date"
        :class="{ 'task-item__due-date--overdue': isOverdue }"
      >
        <i class="fas fa-calendar-alt"></i>
        Due: {{ formatDate(task.dueDate) }}
        <span v-if="isOverdue">(Overdue)</span>
      </div>
    </div>

    <div class="task-item__actions">
      <button
        class="btn btn-sm btn-secondary"
        @click="$emit('edit-task', task)"
        title="Edit task"
      >
        <i class="fas fa-edit"></i>
      </button>

      <button
        class="btn btn-sm btn-danger"
        @click="$emit('delete-task', task.id)"
        title="Delete task"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOverdue() {
      if (!this.task.dueDate || this.task.completed) return false;

      const dueDate = new Date(this.task.dueDate);
      const today = new Date();

      // Remove time part for accurate date comparison
      today.setHours(0, 0, 0, 0);

      return dueDate < today;
    },
    priorityIcon() {
      const icons = {
        high: "fa-exclamation-circle",
        medium: "fa-exclamation",
        low: "fa-arrow-down",
      };

      return icons[this.task.priority] || "fa-circle";
    },
  },
  methods: {
    toggleCompleted() {
      this.$emit("toggle-completed", {
        id: this.task.id,
        completed: !this.task.completed,
      });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Most styles are imported from the main SCSS files
</style>