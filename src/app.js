import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

// Log every request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(compression());
app.use('/uploads', express.static('uploads'));

const corsOptions = {
  origin: 'https://metroblog-frontend.vercel.app',
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions), (req, res) => {
  res.sendStatus(200);
});

// Log CORS headers for each response
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('CORS headers:', res.getHeaders()['access-control-allow-origin']);
  });
  next();
});

app.use('/', router);
app.get('/', (req, res) => res.send('Welcome to Metro Blogs'));

export default app;
