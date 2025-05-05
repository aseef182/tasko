<template>
  <div class="task-manager__stats card">
    <h3>Task Statistics</h3>

    <div class="task-stats">
      <div class="task-stats__item">
        <span class="task-stats__label">Total Tasks:</span>
        <span class="task-stats__value">{{ stats.total }}</span>
      </div>

      <div class="task-stats__item">
        <span class="task-stats__label">Completed:</span>
        <span class="task-stats__value">
          {{ stats.completed }} ({{ completionPercentage }}%)
        </span>
      </div>

      <div class="task-stats__item">
        <span class="task-stats__label">Active:</span>
        <span class="task-stats__value">{{ stats.active }}</span>
      </div>

      <div class="task-stats__item">
        <span class="task-stats__label">Overdue:</span>
        <span class="task-stats__value text-danger">{{ stats.overdue }}</span>
      </div>

      <div class="task-stats__item">
        <span class="task-stats__label">High Priority:</span>
        <span class="task-stats__value text-danger">{{ stats.highPriority }}</span>
      </div>

      <div class="task-stats__item">
        <span class="task-stats__label">Due Today:</span>
        <span class="task-stats__value text-warning">{{ stats.dueToday }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskStats",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    stats() {
      const total = this.tasks.length;
      const completed = this.tasks.filter((task) => task.completed).length;
      const active = total - completed;

      // Today's date with time set to 00:00:00
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Tomorrow's date with time set to 00:00:00
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Calculate overdue tasks (due date is before today and not completed)
      const overdue = this.tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
      }).length;

      // Calculate tasks due today
      const dueToday = this.tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate < tomorrow;
      }).length;

      // Calculate high priority tasks
      const highPriority = this.tasks.filter(
        (task) => !task.completed && task.priority === "high"
      ).length;

      return {
        total,
        completed,
        active,
        overdue,
        dueToday,
        highPriority,
      };
    },
    completionPercentage() {
      if (this.stats.total === 0) return 0;
      return Math.round((this.stats.completed / this.stats.total) * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Most styles are imported from the main SCSS files
</style>
