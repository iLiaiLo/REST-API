const addUserQuery = `INSERT INTO todo_app.users (id,username,email,password,role) VALUES ($1,$2,$3,$4,$5);`;

export default addUserQuery;
