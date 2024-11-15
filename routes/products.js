import express from 'express';
import { PrismaClient } from '@prisma/client';

//express setup
const router = express.Router();

//prisma
const prisma = new PrismaClient({ //prisma setup
    log: ['query', 'info', 'warn', 'error'], //to enable logging
});

//////////
//ROUTES//
//////////

//../products/all
router.get('/all', async (req, res) =>{

    //NOTE: not properly built out, just using to verify data seeded into db
    const allProducts = await prisma.product.findMany();
    res.status(200).json(allProducts);
});

//../products/:id
router.get('/:id', async (req, res) =>{
    res.status(200).json("products by-id route working")
});

//../procuts/purchase
router.put('/purchase', async (req, res) =>{
    res.status(200).json("products purchase route working")
});



export default router;