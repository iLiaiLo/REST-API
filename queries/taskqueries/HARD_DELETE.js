const hardDeleteTask = `DELETE FROM todo_app.tasks
WHERE deleted_at < NOW() - INTERVAL '24 hours' AND is_deleted=TRUE;`;

const hardDeleteUser = `DELETE FROM todo_app.users
WHERE deleted_at < NOW() - INTERVAL '30 days' AND is_deleted=TRUE;`;

export { hardDeleteTask, hardDeleteUser };
