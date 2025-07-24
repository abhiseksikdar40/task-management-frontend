# 📋 Worflo

**Worflo** is a task management platform that enables users to create projects, assign tasks, manage teams, and track progress in real time. It offers a streamlined dashboard for organizing and visualizing work efficiently.

---

## 🚀 Live Demo

👉 [Click to Try the App](https://task-management-frontend-taupe-eight.vercel.app/)

---

## ⚙️ Quick Start

Clone the repository and get started locally:
```
git clone https://github.com/abhiseksikdar40/task-management-frontend.git
cd task-management-frontend
npm install
npm run dev
````

---

## 🛠️ Technologies Used

* React.js
* React Router
* CSS3 / Bootstrap
* Node.js
* Express
* MongoDB
* Chart.js
* JWT (JSON Web Tokens)

---

## 🎥 Demo Video

Watch a complete walkthrough covering the core features of the platform:

🎬 [Discover What’s Inside](https://drive.google.com/file/d/your-demo-link/view)

---

## ✨ Features

### 📊 Dashboard

* View all projects
* Filter project status using a dropdown
* Add new projects via button

### ✅ Tasks

* Select a project to view tasks
* Create tasks for specific projects
* Click task status to update or change it

### 👥 Teams

* View task list for a selected project
* Create and manage teams
* Click on a team to see detailed information

### 👤 Users

* Display all users
* Add users to teams
* Assign users to tasks via team linkage

---

### 📈 Reports

Gain insights into task performance and team productivity:

Number of tasks closed in:

⏱️ Last 24 hours

📅 Last day

📆 Last week

📅 Last month

🔄 Total pending tasks

✅ Total tasks closed by team

---

## 📱 API Reference

### 🔹 Projects

**Create Project**

```http
POST /v1/create/projects
```

**Request Body**

```json
{
  "projectname": "Marketing Site",
  "description": "Redesign project",
  "projectstatus": "To Do"
}
```

---

### 🔹 Tasks

**Create Task**

```http
POST /v1/create/tasks
```

**Request Body**

```json
{
  "taskname": "Design Wireframes",
  "project": "64f1...",
  "team": "64e2...",
  "taskstatus": "In Progress",
  "duedate": "2025-08-01",
  "priority": "High"
}
```

---

### 🔹 Teams

**Create Team**

```http
POST /v1/create/teams
```

**Request Body**

```json
{
  "teamname": "Design Team"
}
```

---

### 🔹 Users

**Create User**

```http
POST /v1/create/users
```

**Request Body**

```json
{
  "username": "John Doe",
  "useremail": "john@example.com",
  "team": "64e2..."
}
```

---

### 🔹 Signup

**Register User**

```http
POST /v1/signup/user
```

**Request Body**

```json
{
  "fullname": "Jane Doe",
  "useremail": "jane@example.com",
  "userpassword": "securepassword"
}
```

---

## 📬 Contact

For bug reports, feature suggestions, or collaboration inquiries:

📧 Email: abhiseksikdar40@gmail.com
🔗 LinkedIn: [Abhisek Sikdar](https://www.linkedin.com/in/abhisek-sikdar)

