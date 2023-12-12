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








for SQL Connect 





const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Database configuration for SQL Server
const sqlConfig = {
  user: 'your_sql_username',
  password: 'your_sql_password',
  server: 'your_sql_server',
  database: 'your_database_name',
  options: {
    encrypt: true, // For SQL Server, set to true if using Azure
  },
};

// Database configuration for MySQL
const mysqlConfig = {
  host: 'your_mysql_host',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
};

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
  .post(async (req, res) => {
    const { username, password } = req.body;

    // Replace this with actual authentication logic (e.g., check against a database)
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      try {
        // Connect to SQL Server
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');

        // Use this section for fetching data from SQL Server
        // const result = await sql.query('SELECT * FROM your_table_name');

        // Connect to MySQL
        const connection = mysql.createConnection(mysqlConfig);
        connection.connect((err) => {
          if (err) {
            console.error('Error connecting to MySQL:', err);
            return res.status(500).json({ success: false, message: 'Error connecting to database' });
          }

          console.log('Connected to MySQL');

          // Use this section for fetching data from MySQL
          // connection.query('SELECT * FROM your_table_name', (error, results) => {
          //   if (error) {
          //     console.error('Error querying MySQL:', error);
          //     return res.status(500).json({ success: false, message: 'Error querying database' });
          //   }

          //   console.log('Data from MySQL:', results);
          // });

          connection.end(); // Close the MySQL connection

          res.json({ success: true, message: 'Login successful' });
        });
      } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        res.status(500).json({ success: false, message: 'Error connecting to database' });
      } finally {
        // Close the SQL Server connection
        await sql.close();
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });







app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
   