const updateTaskQuery = `UPDATE todo_app.tasks SET text=$1,header=$2,status=$3,updated_at=CURRENT_TIMESTAMP WHERE admin_id=$4 AND id=$5 AND is_deleted=FALSE RETURNING updated_at;`;

export default updateTaskQuery;
