const express = require('express');
const session = require('express-session');
//const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

const sessionTimeout = require('./middleware/session.middleware');
const csurf = require('csurf');

const app = express();

app.use(helmet());

//2. CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',                     //Allow only your frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],            //Allowed request types
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']     //Allowed custom headers
}));

app.use(express.json());

//session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'app-secret-key-007',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,          //prevents JS access (protects from stealing cookies by XSS attacks)
      secure: false,           //set it true in production (for HTTPS)
      sameSite: 'lax',      //CSRF protection
      maxAge: 15 * 60 * 1000,  //15 min session limit
    },
  })
);
app.use(sessionTimeout);  //session middleware

//app.use(cookieParser());

//csrf token handling
app.use(csurf());
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  
  res.status(500).json({ message: 'Server error' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/test-session', (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }
  res.status(401).json({ message: 'Not logged in' });
});

app.get('/', (req, res)=> {
    res.send('Too Secure API Running...');
});

module.exports = app;