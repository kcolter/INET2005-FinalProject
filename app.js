import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
