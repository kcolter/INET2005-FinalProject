import express from 'express';

//express setup
const router = express.Router();

//////////
//ROUTES//
//////////

//../products/all
router.get('/all', async (req, res) =>{
    res.status(200).json("products all route working");
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