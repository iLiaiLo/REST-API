const getInitialTasks = `
SELECT id,header,text,status FROM todo_app.tasks
WHERE is_deleted=FALSE
ORDER BY updated_at DESC,id DESC
LIMIT $1;
`;

const getTasks = `SELECT id,header,text,status FROM todo_app.tasks
WHERE is_deleted=FALSE
AND (updated_at < $1 OR (updated_at = $1 AND id < $2))
ORDER BY updated_at DESC,id DESC
LIMIT $3;`;

export { getTasks, getInitialTasks };
