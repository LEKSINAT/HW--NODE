const express = require('express')
const mysql = require('mysql2')

const app = express()
app.use(express.json())

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // change if you have password
  database: 'testdb'
})

db.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err)
  } else {
    console.log('✅ Connected to MySQL')
  }
})

// ✅ Home route
app.get('/', (req, res) => {
  res.send('Hello World')
})

// ✅ GET all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send(result)
  })
})

// ✅ CREATE user
app.post('/users', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).send({ error: 'Name is required' })
  }

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }

      res.status(201).send({
        id: result.insertId,
        name
      })
    }
  )
})

// ✅ UPDATE user
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const { name } = req.body

  db.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ error: 'User not found' })
      }

      res.send({ id, name })
    }
  )
})

// ✅ DELETE user
app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ error: 'User not found' })
      }

      res.send({ message: 'User deleted successfully' })
    }
  )
})

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000')
}) 