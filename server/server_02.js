const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'joniwhfe',
  database: 'Testing'
});


app.post('/api/insert', (req, res) => {
  const {area, district, housing_address, type_of_issue} = req.body;
  const query = 'INSERT INTO network_issue (area, district, housing_address, type_of_issue) VALUES (?, ?, ?, ?)';
  const values = [area, district, housing_address, type_of_issue];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    connection.query(query, values, (error, results) => {
      connection.release(); // Release the connection back to the pool
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully!');
      }
    });
    res.json({ message: 'Data inserted successfully!', data: req.body });
  });
});


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});