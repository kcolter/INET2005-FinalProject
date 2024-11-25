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

    //get inputs
    const {email, password} = req.body;
    //validate input
    if(!email || !password){
        res.status(400).send('Missing required fields');
    }
    //find user in db
    const existingUser = await prisma.Customer.findUnique({
        where: {
            email: email,
        }
    });
    if(!existingUser){
        return res.status(404).send('No account found with that email.');
    }
    //verify pw
    const passwordMatch = await comparePassword(password, existingUser.password);
    if(!passwordMatch){
        return res.status(401).send('Invalid password');
    }
    
    //config session
    req.session.customer_id = existingUser.id;
    req.session.email = existingUser.email;
    req.session.first_name = existingUser.first_name;
    req.session.last_name = existingUser.last_name;

    //send response
    res.json({'email' : email});
});

//../users/logout
router.post('/logout', async (req, res) =>{
    req.session.destroy();
    res.send('session logged out');
});

//../users/getSession
router.get('/getSession', async (req, res) =>{

    if(!req.session.customer_id){
        return res.status(401).send('not logged in');
    }

    res.status(200).json({
        'user id' : req.session.customer_id,
        'email' : req.session.email,
        'first name': req.session.first_name,
        'last name': req.session.last_name
    });
});


export default router;