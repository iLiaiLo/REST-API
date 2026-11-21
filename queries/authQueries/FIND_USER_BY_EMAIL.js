const findUserByEmailQuery = `SELECT id,role,password FROM todo_app.users WHERE email=$1;`;

export default findUserByEmailQuery;
