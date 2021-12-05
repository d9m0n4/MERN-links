const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = config.get('PORT') || 5000;

app.use(express.json());
app.use('/t', require('./routes/redirect.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log('Start on ' + PORT));
