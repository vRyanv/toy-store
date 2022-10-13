const {Pool} = require('pg');
try{
    module.exports = new Pool({
        connectionString: '\n' +
            'postgres://uswldcmpgpdxuq:8c472783508ee1b064b38a9d1311f82653e6602f7c1a5f04cadda48b9807ba0b@ec2-54-91-223-99.compute-1.amazonaws.com:5432/d5rhi0dh84usm6',
        ssl: {
            rejectUnauthorized: false
        }
    });
    console.log('Connect database success')
}catch (error){
    console.log('Connect database fail!')
}