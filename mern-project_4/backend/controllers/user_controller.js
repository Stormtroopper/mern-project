const User_Auth = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let new_user;

    try {
        new_user = await User_Auth.findOne({ email: email });

    } catch (e) {
        console.log(e);
    }
    if (new_user) {
        return res.status(400).json('User exists')
    }
    const hashedpassword = bcrypt.hashSync(password);
    const user = new User_Auth(
        {
            name: name,
            email: email,
            password: hashedpassword
        });
    try {
        await user.save();
    } catch (e) {
        console.log(e)
    }
    return res.status(201).json({ message: user })
}
const login = async (req, res, next) => {
    const { email, password } = req.body;
    let login_user;

    try {
        login_user = await User_Auth.findOne({ email: email });

    } catch (e) {
        return new Error(e);
    }
    if (!login_user) {
        return res.status(400).json('User doesnt exists')
    }
    const passwordcorrect = bcrypt.compareSync(password, login_user.password);
    if (!passwordcorrect) {
        return res.status(400).json('Invalid Password')
    }
    const token = jwt.sign({ id: login_user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "40s"  //Token will be expired after 1 hour
    })
    if (req.cookies[`${login_user._id}`]) {
        req.cookies[`${login_user._id}`] = ""
    }
    res.cookie(String(login_user._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    });
    return res.status(200).json({ message: 'Successfully logged in', user: login_user, token })
}
const verifying = (req, res, next) => {
    // const headers = req.headers[`authorization`];
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);
    //     const token = headers.split(" ")[1];
    if (!token) {
        res.status(404).json({ message: "No token found" })
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (e, user) => {
        if (e) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        console.log(user.id);
        req.id = user.id;
    })
    // console.log(headers);
    next();
}
const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User_Auth.findById(userId, "password");
    } catch (e) {
        return new Error(e)
    }
    if (!user) {
        return res.status(404).json("User not Found")
    }
    return res.status(200).json({ user })
}
const refresh_token = (res) => {
    const cookies = req.header.cookie;
    const prevtoken = cookies.split('=')[1];
    if (!prevtoken) {
        return res.status(400).json({ message: 'Couldnt find token' })
    }
    jwt.verify(String(prevtoken), JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Authentication Failed' })
        }
        res.clearCookie(`${user.id}`);
        res.cookies[`${user.id}`] = "";
        const newToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
            expiresIn: "45s"
        })
        console.log('Generated token', newToken)
        req.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });
        req.id = user.id;
        next();
    })
}
const logout = (req, res, next) => {
    const cookies = req.header.cookie;
    const prevtoken = cookies.split('=')[1];
    if (!prevtoken) {
        return res.status(400).json({ message: 'Couldnt find token' })
    }
    jwt.verify(String(prevtoken), JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Authentication Failed' })
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        const newToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
            expiresIn: "45s"
        })
        console.log('Generated token', newToken)
        return res.status(200).json({ message: 'Successfully logged out' })
    })
}
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.verifying = verifying;
exports.getUser = getUser;
exports.refresh_token = refresh_token;