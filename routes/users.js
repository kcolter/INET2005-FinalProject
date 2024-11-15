import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';

//////////////
//MIDDLEWARE//
//////////////
const router = express.Router();//express setup
const prisma = new PrismaClient({ //prisma setup
    log: ['query', 'info', 'warn', 'error'], //to enable logging
});

//////////
//ROUTES//
//////////

//../users/signup
router.post('/signup', async (req, res) =>{

    //get inputs
    const {email, password, firstName, lastName} = req.body;

    //validation, for now just checking that all are present
    if(!email || !password || !firstName || !lastName){
        return res.status(400).send("Missing required fields [email, password, first name, last name]");
    }

    //check if user already exists
    const existingUser = await prisma.Customer.findUnique({
        where: {
            email: email,
        }
    });
    if (existingUser){
        return res.status(400).send('A user with that email already exists.');
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //add to db
    const user = await prisma.Customer.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword
        },
    });

    //response
    res.json({'user' : email});
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