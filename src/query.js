const database = require('../src/database/connect')
//


// database.query(`insert into users(username, password) values ('admin3', '123123')`)
//     .then((result) => {
//         console.log(result.rows)
//         database.end()
//     })

database.query('select * from users')
    .then((result) => {
        console.log(result.rows)
    })

database.end()