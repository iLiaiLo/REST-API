const deleteTaskQuery = `UPDATE todo_app.tasks SET is_deleted=TRUE,deleted_at=CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP WHERE admin_id=$1 AND id=$2 AND is_deleted=FALSE;`;

export default deleteTaskQuery;
