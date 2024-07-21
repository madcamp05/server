const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const { getUserByUsername, getUserById } = require('./database/model');

const app = express();

// CORS 설정
app.use(cors());

// Body parser 설정
app.use(bodyParser.json());

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key', // 환경 변수를 사용하거나 기본값 설정
  resave: false,
  saveUninitialized: false
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    });
  })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
