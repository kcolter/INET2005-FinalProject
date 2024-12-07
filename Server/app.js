import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import cors from 'cors';
import session from 'express-session';

const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//cors middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//session middleware
app.use(session({
  secret: 'qwerty13579',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000 //1 hour in ms
  }
}));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
