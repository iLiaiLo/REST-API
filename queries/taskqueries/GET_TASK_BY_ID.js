const getTaskById = `
SELECT id,header,text,status,created_at,updated_at
FROM todo_app.tasks
WHERE id=$1 AND is_deleted=FALSE;
`;

const getDeletedTaskById = `
SELECT id,header,text,status,created_at,updated_at,deleted_at
FROM todo_app.tasks
WHERE admin_id=$1 AND id=$2 AND is_deleted=TRUE;
`;

export { getTaskById, getDeletedTaskById };
