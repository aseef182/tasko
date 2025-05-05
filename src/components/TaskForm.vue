<template>
  <form class="task-form" @submit.prevent="submitTask">
    <div class="task-form__group">
      <label for="taskTitle">Task Title</label>
      <input
        type="text"
        id="taskTitle"
        v-model="task.title"
        placeholder="Enter task title"
        required
      />
    </div>

    <div class="task-form__group">
      <label for="taskDescription">Description (optional)</label>
      <textarea
        id="taskDescription"
        v-model="task.description"
        placeholder="Enter task description"
      ></textarea>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="task-form__group">
          <label for="taskDueDate">Due Date (optional)</label>
          <input type="date" id="taskDueDate" v-model="task.dueDate" />
        </div>
      </div>

      <div class="col-md-6">
        <div class="task-form__group">
          <label for="taskPriority">Priority</label>
          <select id="taskPriority" v-model="task.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>

    <div class="task-form__buttons">
      <button type="button" class="btn btn-secondary" @click="resetForm" v-if="isEditing">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Update Task" : "Add Task" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    editTask: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      task: {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        completed: false,
        createdAt: null,
      },
    };
  },
  computed: {
    isEditing() {
      return this.task.id !== null;
    },
  },
  watch: {
    editTask: {
      handler(newVal) {
        if (newVal) {
          // Clone the object to avoid mutating props directly
          this.task = { ...newVal };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  methods: {
    submitTask() {
      const taskToSubmit = { ...this.task };

      if (!taskToSubmit.id) {
        // For new tasks
        taskToSubmit.id = Date.now();
        taskToSubmit.createdAt = new Date().toISOString();
        this.$emit("add-task", taskToSubmit);
      } else {
        // For existing tasks
        this.$emit("update-task", taskToSubmit);
      }

      this.resetForm();
    },
    resetForm() {
      this.task = {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        completed: false,
        createdAt: null,
      };

      // Let parent know we're cancelling edit mode
      if (this.editTask) {
        this.$emit("cancel-edit");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Most styles are imported from the main SCSS files
</style>
