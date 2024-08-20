const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// geçici bir veri deposu
let messages = [];

// kullanıcıların mesaj göndereceği api
app.post('/api/messages', (req, res) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ error: 'Sender and content are required' });
  }

  const newMessage = { id: messages.length + 1, sender, content, timestamp: new Date() };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

// mesajları alabileceğiniz api
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

//sunucunun çalışacağı portu belirler, tanımlı ise onu kullanır yoksa main hali 5000'dir.
const PORT = process.env.PORT || 5000;

//sunucuyu başlatır ve port üzerinde dinlemeye başlar, başarılı ise konsola port numarasını yazdırır.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// express uygulamasını dışarı aktarır yani diğer dosyalarda bu uygulamanın kullanılmasını sağlar.
module.exports = app;
