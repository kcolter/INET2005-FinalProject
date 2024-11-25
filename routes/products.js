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

//../products/purchase
router.post('/purchase', async (req, res) =>{

    //verify user is logged in
    if(!req.session.customer_id){
        return res.status(401).send('not logged in');
    }

    //get inputs
    const {street, city, province, country, postal_code, 
        credit_card, credit_expire, credit_cvv, cart, 
        invoice_amt, invoice_tax, invoice_total} = req.body;

    //if not all inputs present, return error
    if(!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire || !credit_cvv || !cart || !invoice_amt || !invoice_tax || !invoice_total){
        return res.status(400).send('missing required fields, please ensure all inputs present');
    }

    //parse all non-string values to proper types 
    var credit_card_parsed = parseInt(credit_card);
    var credit_cvv_parsed = parseInt(credit_cvv);
    var invoice_amt_parsed = parseFloat(invoice_amt);
    var invoice_tax_parsed = parseFloat(invoice_tax);
    var invoice_total_parsed = parseFloat(invoice_total);

    //split cart on coma
    var cart_split = cart.split(',');
    //convert to ints
    cart_split.forEach(element => {
        element = parseInt(element);
    });

    //for the order_date
    var today = new Date(Date.now());
    today = today.getDate() + " " + today.getMonth() + " " + today.getFullYear();

    const thisPurchase = await prisma.Purchase.create({
        data: {
            customer_id: req.session.customer_id,
            street: street,
            city: city,
            province: province,
            country: country,
            postal_code: postal_code,
            credit_card: credit_card_parsed,
            credit_expire:credit_expire,
            credit_cvv: credit_cvv_parsed,
            invoice_amt: invoice_amt_parsed,
            invoice_tax: invoice_tax_parsed,
            invoice_total: invoice_total_parsed,
            order_date: today
        },
    });

    //works since we know only 10 products, in production make length dynamic from count of products table 
    var ItemCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    for(let i=0; i<cart_split.length; i++){
        ItemCounts[cart_split[i]] = ItemCounts[cart_split[i]] + 1; //increment that products index in ItemCounts
    }

    for(let i=0; i<ItemCounts.length; i++){ //for each product
        if(ItemCounts[i] > 0){ //if at least 1 product of id 'i' exists in the cart
          const thisItem = await prisma.PurchaseItem.create({ //create PurchaseItem
                data: {
                    purchase_id: thisPurchase.purchase_id, //use the id from the above created purchase
                    product_id: i,
                    quantity: ItemCounts[i]
                },
           });
        }
    }

    res.status(200).json("products purchase route working");
});



export default router;