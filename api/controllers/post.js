import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const getPosts = (req, res) => {
    let query = "SELECT * FROM posts";
    let values = [];

    if (req.query.cat) {
        query = "SELECT * FROM posts WHERE cat=?";
        values = [req.query.cat];
    }

    db.query(query, values, (err, data) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(data);
    });

}

export const getPost = (req, res) => {
    const query = `
    SELECT u.username, u.img AS userImg, p.id, p.title, p.desc, p.img AS postImg, p.cat, p.date
    FROM users u
    JOIN posts p ON u.id = p.uid
    WHERE p.id = ?
    `;

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const query = "INSERT INTO posts(`title`,`desc`, `img`, `cat`, `date`, `uid`) VALUES(?)";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been created")
        })
    });

}

export const deletePost = (req, res) => {
    // const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const query = "DELETE FROM posts WHERE `id`=? AND `uid`=?"

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!");

            return res.status(200).json("Post has been deleted!");
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const query = "UPDATE posts SET `title`=?,`desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(query, [...values,postId,userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been updated")
        })
    });
}