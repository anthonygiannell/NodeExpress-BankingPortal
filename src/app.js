const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public/')))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

const accountData = fs.readFileSync(path.join(__dirname, './json/accounts.json'), { encoding: 'UTF8' })
const userData = fs.readFileSync(path.join(__dirname, './json/users.json'), { encoding: 'UTF8' })
const accounts = JSON.parse(accountData)
const users = JSON.parse(userData)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts
  })
})
app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  })
})
app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  })
})
app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  })
})
app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0]
  })
})

app.listen(port, () => console.log(`PS Project Running on port ${port}!`))