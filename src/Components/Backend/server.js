const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

// Database configuration for SQL Server
const sqlConfig = {
  user: 'erpbo',
  password: 'erpbo',
  server: '195.159.227.100',
  database: 'YH_optimize',
  options: {
    encrypt: true,
  },
};

// Create a connection pool middleware
const sqlMiddleware = async (req, res, next) => {
  try {
    req.sql = await new sql.ConnectionPool(sqlConfig).connect();
    next();
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
    res.status(500).json({ success: false, message: 'Error connecting to the database' });
  }
};

// Authentication middleware (replace with your actual logic)
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  // Replace this with your actual authentication logic
  const isValidUser = users.some((user) => user.username === username && user.password === password);

  if (isValidUser) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
};

// Enable CORS for the preflight request
app.options('/api/login', cors());

app.post('/api/login', authenticate, sqlMiddleware, async (req, res) => {
  try {
    console.log('Connected to SQL Server');

    // Use this section for fetching data from SQL Server
    // const result = await req.sql.request().query('SELECT * FROM your_table_name');

    // Redirect to the Report.js page after successful login
    res.redirect('/api/report');
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ success: false, message: 'Error executing SQL query' });
  } finally {
    // Close the SQL Server connection
    await req.sql.close();
  }
});

app.get('/api/report', sqlMiddleware, async (req, res) => {
  try {
    const query = 'SELECT TOP 100 coshopno, coshopname, coitemname, coitemno, N_cofkitemgroupno FROM ViDnRepItemDailySales_FSM_U';
    const result = await req.sql.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the SQL Server connection
    await req.sql.close();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Wrap app.listen with an async block
(async () => {
  try {
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();

// Event listener for nodemon restart
process.on('SIGUSR2', () => {
  console.log('Code refreshed. Server restarted.');
});















































// const express = require('express');
// const bodyParser = require('body-parser');
// const sql = require('mssql');
// const mysql = require('mysql2');

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());

// //<sqldatasource>server=195.159.227.100, 5555;Database=BakerHansen16062023;uid=erpbo;pwd=erpbo;Max Pool Size=1000;Connect Timeout=200;</sqldatasource>
// // Database configuration for SQL Server
// const sqlConfig = {
//   user: 'erpbo',
//   password: 'erpbo',
//   server: '195.159.227.100',
//   database: 'YH_optimize',
//   options: {
//     encrypt: true, // For SQL Server, set to true if using Azure
//   },
// };

// // // Database configuration for MySQL
// // const mysqlConfig = {
// //   host: 'your_mysql_host',
// //   user: 'your_mysql_username',
// //   password: 'your_mysql_password',
// //   database: 'your_database_name',
// // };

// // Dummy user data (replace this with a database in a real application)
// const users = [
//   { username: '11', password: '' },
//   // Add more users as needed
// ];

// // Endpoint for handling both GET and POST requests to /api/login
// app.get('/api/report', async (req, res) => {
//   try {
//     const query = 'SELECT TOP 100 coshopno, coshopname, coitemname, coitemno, N_cofkitemgroupno FROM ViDnRepItemDailySales_FSM_U';
//     const result = await executeSqlQuery(query);
//     res.json(result);
//   } catch (error) {
//     console.error('Error executing SQL query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.route('/api/login')
//   .get((req, res) => {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   })
//   .post(async (req, res) => {
//     const { username, password } = req.body;

//     // Replace this with actual authentication logic (e.g., check against a database)
//     const user = users.find((user) => user.username === username && user.password === password);

//     if (user) {
//       try {
//         // Connect to SQL Server
//         await sql.connect(sqlConfig);
//         console.log('Connected to SQL Server');

//         // Use this section for fetching data from SQL Server
//         // const result = await sql.query('SELECT * FROM your_table_name');

//         // Connect to MySQL
//         const connection = mysql.createConnection(mysqlConfig);
//         connection.connect((err) => {
//           if (err) {
//             console.error('Error connecting to MySQL:', err);
//             return res.status(500).json({ success: false, message: 'Error connecting to database' });
//           }

//           console.log('Connected to MySQL');

//           // Use this section for fetching data from MySQL
//           // connection.query('SELECT * FROM your_table_name', (error, results) => {
//           //   if (error) {
//           //     console.error('Error querying MySQL:', error);
//           //     return res.status(500).json({ success: false, message: 'Error querying database' });
//           //   }

//           //   console.log('Data from MySQL:', results);
//           // });

//           connection.end(); // Close the MySQL connection

//           res.json({ success: true, message: 'Login successful' });
//         });
//       } catch (error) {
//         console.error('Error connecting to SQL Server:', error);
//         res.status(500).json({ success: false, message: 'Error connecting to database' });
//       } finally {
//         // Close the SQL Server connection
//         await sql.close();
//       }
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }
//   });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
