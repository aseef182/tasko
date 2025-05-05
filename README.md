# Tasko

A feature-rich task management application built with **Vue.js 2** and **SCSS**, demonstrating core web development principles and best practices.

## 🚀 Features

- Create, update, and delete tasks
- Filter tasks by status and priority
- View task completion statistics
- Sort tasks by date and priority
- Responsive design for all screen sizes
- Local storage persistence

## 🛠️ Technologies Used

- **Vue.js 2** – Progressive JavaScript framework
- **SCSS** – CSS preprocessor with variables, nesting, and mixins
- **HTML5** – Semantic markup and forms
- **Local Storage API** – For persisting tasks in the browser

## 📚 Concepts Demonstrated

### HTML5

- Semantic structure with accessible elements
- Forms, input types, and validation

### CSS/SCSS

- SCSS modular structure: variables, mixins, nesting
- Flexbox and Grid for layout
- Responsive design with media queries

### Vue.js 2

- Data binding (`v-model`, `v-bind`)
- Directives (`v-if`, `v-for`, `v-show`)
- Computed properties and methods
- Event handling (`@click`, `@submit`)
- Component architecture and communication
- Lifecycle hooks

## 📁 Project Structure

```

tasko/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── TaskForm.vue
│   │   ├── TaskItem.vue
│   │   ├── TaskList.vue
│   │   └── TaskStats.vue
│   ├── styles/
│   │   ├── \_variables.scss
│   │   ├── \_mixins.scss
│   │   ├── \_base.scss
│   │   └── main.scss
│   ├── App.vue
│   └── main.js
├── package.json
└── vue.config.js

````

## ⚙️ Getting Started

### Prerequisites

- Node.js (v12 or newer)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/tasko.git
cd tasko
npm install
# or
yarn install
````

## 🔧 Development

### Run Development Server

```bash
npm run serve
# or
yarn serve
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```
