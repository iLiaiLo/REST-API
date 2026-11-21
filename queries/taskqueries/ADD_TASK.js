const addTaskQuery = `INSERT INTO todo_app.tasks(id,admin_id,text,header) VALUES ($1,$2,$3,$4) RETURNING status,created_at,updated_at;`;

export default addTaskQuery;
