import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import jwt from 'jsonwebtoken'
export const register = (req, res) => {

    //CHECKING EXISTING USER
    const query = "SELECT * FROM `users` WHERE `email` = ? OR `username` = ?";

    db.query(query, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const query = "INSERT INTO users(`username`,`email`,`password`) VALUES(?)";
        //if your SQL uses a single placeholder like above, then MySQL expects one value and that value must be an array.
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ];
        db.query(query, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created")
        })
    });
}

export const login = (req, res) => {
    //Check user

    const query = "SELECT * FROM `users` WHERE `username`=?";
    db.query(query, [req.body.username], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Internal server error");
        }
        if (data.length === 0) return res.status(404).json("User not found");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password"); //actually it's only a wrong password

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
        const { password, ...other } = data[0];

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: isProduction ? true : false,
            sameSite: isProduction ? "none" : "lax",
        }).status(200).json(other);
    })
}

export const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: isProduction ? true : false,
        sameSite: isProduction ? "none" : "lax",
    }).status(200).json("User has been logged out");
}