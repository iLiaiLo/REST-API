const restoreDeletedTaskQuery = `UPDATE todo_app.tasks SET is_deleted=FALSE,deleted_at=NULL,updated_at=CURRENT_TIMESTAMP WHERE admin_id=$1 AND id=$2 AND is_deleted=TRUE;`;

export default restoreDeletedTaskQuery;
