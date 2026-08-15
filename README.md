# TaskFlow

A lightweight task management board for small teams, built as a full-stack take-home assignment.

TaskFlow allows users to view a board, create tasks, edit tasks, delete tasks, move tasks between columns, and filter tasks by priority. All task changes are persisted to a SQLite database through a Flask REST API.

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript

### Backend

* Python
* Flask
* Flask-CORS
* SQLite
* Raw SQL
* pytest

## Project Structure

```text
TaskFlow/
├── backend/
│   ├── app/
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── init_db.py
│   │   │   └── seed.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── tasks.py
│   │   │
│   │   ├── services/
│   │   │   ├── schema.sql
│   │   │   └── task_service.py
│   │   │
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── conftest.py
│   │       └── test_tasks.py
│   │
│   ├── instance/
│   │   └── taskflow.db
│   │
│   ├── requirements.txt
│   └── run.py
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    │       └── api.js
    │
    ├── package.json
    └── vite.config.js
```

## Core Features

* View the TaskFlow board and its columns
* Create a new task
* Edit an existing task
* Delete a task
* Move tasks between columns
* Filter tasks by priority
* Persistent SQLite database storage
* Backend validation for required fields
* API error handling
* Seed data for a fresh database
* Automated backend tests

## Database Design

TaskFlow uses SQLite with three relational tables:

```text
Board
  │
  └── Columns
        │
        └── Tasks
```

### Boards

Stores the task boards.

* `id` — primary key
* `name` — required board name
* `created_at` — creation timestamp

### Columns

Stores columns belonging to a board.

* `id` — primary key
* `board_id` — foreign key to `boards`
* `name` — required column name
* `position` — column ordering

### Tasks

Stores tasks belonging to columns.

* `id` — primary key
* `column_id` — foreign key to `columns`
* `title` — required task title
* `description` — optional description
* `priority` — Low, Medium, or High
* `created_at` — creation timestamp

Foreign keys are enabled in SQLite and cascading deletes are used so deleting a board or column also removes its dependent records.

The complete database schema is available in:

```text
backend/app/services/schema.sql
```

## SQL Queries

The application uses raw SQL rather than relying on an ORM.

Two non-trivial database queries required by the assignment are implemented in `task_service.py`.

### Tasks by Priority

Returns tasks with a specified priority, newest first:

```sql
SELECT id, column_id, title, description, priority, created_at
FROM tasks
WHERE priority = ?
ORDER BY created_at DESC;
```

### Task Count per Column

Returns the number of tasks belonging to each column on a board:

```sql
SELECT
    columns.id,
    columns.name,
    COUNT(tasks.id) AS task_count
FROM columns
LEFT JOIN tasks
    ON tasks.column_id = columns.id
WHERE columns.board_id = ?
GROUP BY columns.id, columns.name
ORDER BY columns.position;
```

These queries are executed directly against SQLite rather than fetching all records and filtering them in application code.

## API Endpoints

| Method | Endpoint                       | Purpose                              |
| ------ | ------------------------------ | ------------------------------------ |
| GET    | `/api/board`                   | Get the board with columns and tasks |
| POST   | `/api/tasks`                   | Create a task                        |
| PUT    | `/api/tasks/<id>`              | Update a task                        |
| DELETE | `/api/tasks/<id>`              | Delete a task                        |
| PATCH  | `/api/tasks/<id>/move`         | Move a task to another column        |
| GET    | `/api/tasks?priority=High`     | Get tasks by priority                |
| GET    | `/api/boards/<id>/task-counts` | Get task counts per column           |

## Validation and Error Handling

Task titles are required and are validated on the backend as well as through the frontend form.

The backend rejects:

* Empty task titles
* Missing columns
* Invalid priorities

API responses use appropriate HTTP status codes such as:

* `201` — task created
* `200` — successful operation
* `400` — invalid request
* `404` — resource not found
* `500` — unexpected server error

The frontend displays meaningful error messages instead of exposing raw backend errors to the user.

## Running the Backend

### 1. Navigate to the backend

```bash
cd backend
```

### 2. Create a virtual environment

Windows PowerShell:

```powershell
python -m venv venv
```

### 3. Activate the virtual environment

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```powershell
pip install -r requirements.txt
```

### 5. Initialize the database

```powershell
python -m app.db.init_db
```

### 6. Seed the database

```powershell
python -m app.db.seed
```

The seed command is safe to run again and will not duplicate the existing seed data.

### 7. Start Flask

```powershell
python run.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

## Running the Frontend

Open a second terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL, normally:

```text
http://localhost:5173
```

Open that URL in a browser.

## Running Tests

Backend tests use pytest.

From the `backend` directory with the virtual environment activated:

```powershell
pytest
```

The test suite covers the required cases:

1. Creating a task without a title fails.
2. Moving a task updates its column correctly.
3. The database-layer task-count query returns the expected results.

The tests use a temporary SQLite database so they do not modify the application's development database.

## Design Decisions and Assumptions

Authentication and user accounts were intentionally not implemented because the assignment explicitly lists accounts, multiple users, and teams as out of scope.

The application uses a single seeded board because the assignment focuses on the task-board functionality rather than multi-user or multi-board management.

SQLite was selected because it satisfies the assignment's relational database requirement while keeping the project easy to run from a fresh clone without requiring a separate database server.

Raw SQL was used instead of an ORM to make the database schema and queries explicit and easy to inspect.

Task movement is implemented using a simple column control rather than drag-and-drop. This keeps the core functionality reliable while avoiding unnecessary complexity.

## What I Would Improve With More Time

If additional time were available, I would consider:

* Drag-and-drop task movement
* Task title search
* Task counts displayed in each column
* More comprehensive API and frontend tests
* Better loading states and empty states
* Production deployment
* Environment-based API configuration instead of a hardcoded development API URL

The focus was kept on completing the required functionality reliably rather than adding features at the expense of stability.

## Development Notes

The project was developed incrementally, starting with the frontend structure and task-board UI, followed by the SQLite schema, seed data, Flask API, persistence, validation, and automated backend tests.

One particularly useful part of the implementation was working directly with SQLite and raw SQL rather than hiding the database operations behind an ORM. This made the relationships, constraints, joins, and aggregate queries explicit and easier to verify.

## Status

The required TaskFlow functionality is implemented and tested.

```text
Frontend        ✅
Backend         ✅
SQLite          ✅
CRUD            ✅
Task movement   ✅
Filtering       ✅
Validation      ✅
Seed data       ✅
Raw SQL         ✅

Tests           ✅ 3/3