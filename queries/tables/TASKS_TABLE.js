const createTasksTableQuery = `
CREATE TABLE IF NOT EXISTS todo_app.tasks
(
    id UUID PRIMARY KEY,
    admin_id UUID REFERENCES todo_app.users(id) ON DELETE CASCADE,
    header TEXT NOT NULL,
    text TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('todo', 'in progress', 'done')) DEFAULT 'todo',
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS task_deleted_at ON todo_app.tasks (deleted_at) WHERE deleted_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tasks_updated_id_active
ON todo_app.tasks (updated_at DESC,id DESC);
`;

export default createTasksTableQuery;
