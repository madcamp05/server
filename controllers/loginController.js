const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../database/model');

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      console.log('Invalid username:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.user_password);

    if (!isMatch) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Login successful:', username);
    return res.json({ token });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
