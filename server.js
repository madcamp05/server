const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername, getUserById } = require('./database/model');
const bcrypt = require('bcryptjs');
const { login } = require('./routes/login');

const app = express();

// CORS 설정
app.use(cors());

// Body parser 설정
app.use(bodyParser.json());

// 세션 설정
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// Passport 로컬 전략 설정
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.user_password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// 세션에서 사용자 정보 직렬화
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

// 세션에서 사용자 정보 역직렬화
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// 라우트 설정
app.post('/api/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
