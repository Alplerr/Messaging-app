const express = require('express');
const router = express.Router();

let users = []; // basit bir kullanıcı dizisidir.

//giriş işlemi
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.json({ token: 'dummy-token', user });      //kullanıcı bulunursa sahte bir token dönsün.
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });      //kullanıcı bulunmazsa hata versin.
  }
});

//kayıt işlemi
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  //yeni kullanıcıyı eklesin.
  users.push(user);
  return res.json({ token: 'dummy-token', user });
});

//kullanıcı bilgilerini getirsin.
router.get('/user', (req, res) => {
  
  return res.json({ user: { username: 'dummy-user' } });      //sabit bir kullanıcı döner.
});

module.exports = router;
