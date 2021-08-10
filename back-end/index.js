require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const userRouter = require('./src/controllers/UserController');
const productsRouter = require('./src/controllers/ProductController');
const salesRouter = require('./src/controllers/SalesController');
const routerMessage = require('./chat/controllers/mongoController');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const { createMessages } = require('./chat/models/mongoModel');

const port = 3001;
const portSocket = 4001;

const hora = () => {
  const dNow = new Date();
  const min = () => {
    if (dNow.getMinutes() < 10) {
      return `0${dNow.getMinutes()}`;
    }
    return dNow.getMinutes();
  };
  const hr = () => {
    if (dNow.getHours() < 10) {
      return `0${dNow.getHours()}`;
    }
    return dNow.getHours();
  };
  const localdate = `${hr()}:${min()}`;
  return localdate;
};

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  socket.on('message', async ({ from, to, message }) => {
    const time = new Date();
    if (from !== undefined) {
      createMessages(from, to, message, time);
      io.emit('messages', { from, to, message, time }); 
    }
  });
});

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/chat', routerMessage);
app.use('/images', express.static(`${process.cwd()}/images`));

app.use(errorMiddleware);
httpServer.listen(portSocket, () => console.log(`Example app listening on port ${portSocket}!`));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
