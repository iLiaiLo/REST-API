const softDeleteQuery = `UPDATE todo_app.users 
SET is_account_verified=FALSE, is_deleted=TRUE,
updated_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP
WHERE id = $1 AND deleted_at IS NULL
RETURNING email;`;

export default softDeleteQuery;
