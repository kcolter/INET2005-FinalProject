import express from 'express';

//express setup
const router = express.Router();

//////////
//ROUTES//
//////////

//../users/signup
router.post('/signup', async (req, res) =>{
    res.status(200).json("users signup route working");
});

//../users/login
router.post('/login', async (req, res) =>{
    res.status(200).json("users login route working");
});

//../users/logout
router.post('/logout', async (req, res) =>{
    res.status(200).json("users logout route working");
});

//../users/getSession
router.get('/getSession', async (req, res) =>{
    res.status(200).json("users getSession route working");
});


export default router;