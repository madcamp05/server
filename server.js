require('dotenv').config();
const fs = require('fs');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mysql = require('mysql2/promise');
const { initializeDatabase } = require('./database/db'); // Adjust the path according to your project structure

const app = express();
const PORT = 3000;

// // 세션 설정
// app.use(session({
//   resave: false,
//   saveUninitialized: true,
// }));

app.use(passport.initialize());
app.use(passport.session());

// 초기화 실행
initializeDatabase();

// 라우트 설정
// const gitcatRouter = require('./routes/gitcatRouter');
// app.use('/gitcat', gitcatRouter); // Using repoRouter

// // 기본 라우트
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to GitCat</h1><a href="/auth/github">Login with GitHub</a>');
// });

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});