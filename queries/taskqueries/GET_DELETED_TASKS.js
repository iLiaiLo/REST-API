const getInitialDeletedTasks = `
    SELECT id,text,header,status FROM todo_app.tasks
    WHERE is_deleted=TRUE AND admin_id=$1
    ORDER BY deleted_at DESC,id DESC
    LIMIT $2;
`;

const getDeletedTasks = `SELECT id,text,header,status FROM todo_app.tasks
WHERE is_deleted=TRUE AND admin_id=$1
AND (deleted_at < $2 OR (deleted_at = $2 AND id < $3))
ORDER BY deleted_at DESC,id DESC
LIMIT $4;`;

export { getDeletedTasks, getInitialDeletedTasks };
