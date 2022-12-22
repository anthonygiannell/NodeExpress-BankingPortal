const path = require('path')
const express = require('express')
const { accounts, users } = require('./data')
const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.urlencoded({ extended: true }))
app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts
  })
})
app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0]
  })
})


app.listen(port, () => console.log(`PS Project Running on port ${port}!`))
