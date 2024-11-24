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
    if (!allProducts){
        res.status(404).json("Could not retrieve any data");
    }
    res.status(200).json(allProducts);
});

//../products/:id
router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const parsedId = parseInt(id);

    if(isNaN(parsedId)){
        return res.status(400).json("Could not parse an integer from " + id);
    }

    //check to see if the given id exists to stop an endless await
    const doesIdExist = await prisma.product.count({
        where: {
            product_id: parseInt(parsedId),
        }
    });

    if(doesIdExist == 0){
        return res.status(404).json("Could not find a product with ID " + parsedId);
    } else {
        const thisProduct = await prisma.product.findUnique({
            where: {
                product_id: parseInt(parsedId),
            }
        });

        res.status(200).json(thisProduct);
    }
});

//../procuts/purchase
router.put('/purchase', async (req, res) =>{
    res.status(200).json("products purchase route working")
});



export default router;