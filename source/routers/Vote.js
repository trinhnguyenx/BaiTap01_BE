const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Lưu trữ số lượng vote
let voteCount = 0;

// Route hiển thị số lượng vote hiện tại
app.get('/votes', (req, res) => {
  res.json({ count: voteCount });
});

// Route xử lý vote
app.post('/vote', (req, res) => {
  voteCount++;
  res.json({ success: true });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server đã khởi động trên cổng 3000.');
});
