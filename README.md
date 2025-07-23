# 📋 Worflo

Worflo is a task management platform that allows users to create projects, assign tasks, manage teams, and track task progress in real-time. It provides a streamlined dashboard for organizing and visualizing work.

---

## 🚀 Live Demo

👉 [Click to Try the App](https://worflo-frontend.vercel.app)

---

## ⚙️ Quick Start

```bash
git clone https://github.com/yourusername/worflo-frontend.git
cd worflo-frontend
npm install
npm run dev
```

---

## 🛠️ Technologies Used

* React.js
* React Router
* CSS3 / Bootstrap
* Node.js
* Express
* MongoDB
* Chart.js

---

## 🎥 Demo Video

Watch a complete walkthrough covering the core features of this platform.

[Discover What’s Inside](https://drive.google.com/file/d/your-demo-link/view)

---

## ✨ Features

### 📊 Dashboard

* Displays project/task metrics
* Shows task status breakdown
* Charts for team productivity

### 📁 Projects

* Create new projects
* View all projects
* Assign tasks under projects

### ✅ Tasks

* Assign tasks to teams
* Set priority and due dates
* Track status (To Do, In Progress, Completed, Closed)
* Edit or update tasks

### 👥 Teams

* Create and manage teams
* Assign teams to tasks
* View team-wise tasks

### 👤 Users

* Add users to teams
* Assign users under tasks via team linkage
* User info management

---

## 📱 API Reference

### 🔹 Projects

#### **Create Project**

```http
POST /v1/projects
```

**Body:**
```json
{
  "projectname": "Marketing Site",
  "description": "Redesign project",
  "projectstatus": "To Do"
}
```

---

### 🔹 Tasks

#### **Create Task**

```http
POST /v1/tasks
```

**Body:**
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

#### **Create Team**

```http
POST /v1/teams
```

**Body:**
```json
{
  "teamname": "Design Team"
}
```

---

### 🔹 Users

#### **Create User**

```http
POST /v1/users
```

**Body:**
```json
{
  "username": "John Doe",
  "useremail": "john@example.com",
  "team": "64e2..."
}
```

---

### 🔹 Signup

#### **Register User**

```http
POST /v1/signup
```

**Body:**
```json
{
  "fullname": "Jane Doe",
  "useremail": "jane@example.com",
  "userpassword": "securepassword"
}
```

---

## 📬 Contact

For bugs, feature requests, or collaboration:

📧 yourname@example.com  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)
