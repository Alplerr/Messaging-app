const express = require('express');
const router = express.Router();

// mesajları saklamak için boş bir dizi.
let messages = [];
  
//post isteği için bir route oluştur.
  router.post('/', (req, res) => {
    const { message, username } = req.body;
    
    //gelen veriyi al ve nesne olarak dizine eklesin.
    messages.push({ username, message, timestamp: new Date() });
    
    //istek başarılı ise json formatında yanıt göndersin.
    res.json({ success: true });
});
// get isteği için route oluştursun.
router.get('/', (req, res) => {
  
  //tüm mesajları json formatında yanıt olarak gönder.
  res.json({ messages });
});
// bu modülü dışarı aktararak diğer dosyalarda kullanılmasına izin verir.
module.exports = router;
