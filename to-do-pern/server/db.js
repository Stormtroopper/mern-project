const Pool=require('pg').Pool;
const new_pool=new Pool({
user:"postgres",
password:'Showtime4#',
host:'localhost',
port:5432,
database:'new_pern'
})
module.exports=new_pool;