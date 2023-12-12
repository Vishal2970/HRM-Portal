// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());

// // Dummy user data (replace this with a database in a real application)
// const users = [
//   { username: 'demo', password: 'password' },
//   // Add more users as needed
// ];

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   // Replace this with actual authentication logic (e.g., check against a database)
//   const user = users.find((user) => user.username === username && user.password === password);

//   if (user) {
//     res.json({ success: true, message: 'Login successful' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid username or password' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Dummy user data (replace this with a database in a real application)
const users = [
  { username: 'demo', password: 'password' },
  // Add more users as needed
];

// Endpoint for handling both GET and POST requests to /api/login
app.route('/api/login')
  .get((req, res) => {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  })
  .post((req, res) => {
    const { username, password } = req.body;

    // Replace this with actual authentication logic (e.g., check against a database)
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
