import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/ownerlogin", (req, res) => {
  const sql = "SELECT * from book_store_owner Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/genre', (req, res) => {
    const sql = "SELECT * FROM Genre";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_genre', (req, res) => {
    const sql = "INSERT INTO Genre (`genreName`) VALUES (?)"
    con.query(sql, [req.body.genreName], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})


router.post('/add_book', (req, res) => {
    const sql = "INSERT INTO Book (name, author, genre_id, year, price ) VALUES (?, ?, ?, ?, ?)";

    con.query(sql,[req.body.name,
        req.body.author,
        req.body.genre_id,
        req.body.year,
        req.body.price], (err, result) => {
            console.log(err)
            if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
        })
           
})

router.get('/search_books', (req, res) => {
    const searchQuery = req.query.search;

    const sql = `
        SELECT Book.id, Book.name, Book.author, Book.year, Book.price, Genre.genreName
        FROM Book
        LEFT JOIN Genre ON Book.genre_id = Genre.id
        WHERE
            Book.name LIKE ? OR
            Book.author LIKE ? OR
            Genre.genreName LIKE ? OR
            CAST(Book.year AS CHAR) LIKE ? OR
            CAST(Book.price AS CHAR) LIKE ?
    `;
    const params = Array(5).fill(`%${searchQuery}%`);

    con.query(sql, params, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});


router.put('/edit_genre/:id', (req, res) => {
    const sql = "UPDATE Genre SET genreName = ? WHERE id = ?";
    con.query(sql, [req.body.name, req.params.id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err})
        return res.json({Status: true, Result: result})
    })
})



router.get('/book', (req, res) => {
    const sql = `
        SELECT Book.id, Book.name, Book.author, Book.year, Book.price, Genre.genreName
        FROM Book
        LEFT JOIN Genre ON Book.genre_id = Genre.id
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});


router.get('/book/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Book WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_book/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE Book 
        set name = ?, author = ?, genre_id = ?, year = ?, price = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.author,
        req.body.genre_id,
        req.body.year,
        req.body.price
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_book/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from Book where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})



router.get('/book_count', (req, res) => {
    const sql = "select count(id) as book from Book";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})

    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
