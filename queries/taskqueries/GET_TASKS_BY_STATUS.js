const getInitialTasksByStatus = `
    SELECT id,header,text,status,created_at,updated_at
    FROM todo_app.tasks WHERE status=$1 AND is_deleted=FALSE
    ORDER BY updated_at DESC,id DESC
    LIMIT $2;
`;

const getTasksByStatus = `SELECT id,header,text,status,created_at,updated_at
FROM todo_app.tasks WHERE status=$1 AND is_deleted=FALSE
AND (updated_at < $2 OR (updated_at = $2 AND id < $3))
ORDER BY updated_at DESC,id DESC
LIMIT $4;`;

export { getTasksByStatus, getInitialTasksByStatus };
