import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nidam1110.",
    database: "book_search"
});

con.connect(function(err) {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected");
    }
});

export default con;
