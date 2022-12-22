const express = require('express')
const { accounts, writeJSON } = require('../data')

const router = express.Router()

router
  .get('/transfer', (req, res) => {
    res.render('transfer')
  })
  .post('/transfer', (req, res) => {
    const { to, from, amount } = req.body
    accounts[from].balance -= amount
    accounts[to].balance += parseInt(amount)

    writeJSON()

    res.render('transfer', { message: 'Transfer Completed' })
  })

router
  .get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit })
  })
  .post('/payment', (req, res) => {
    const { amount } = req.body
    accounts.credit.balance -= amount
    accounts.credit.available += parseInt(amount)

    writeJSON()

    res.render('payment', {
      message: 'Payment Successful',
      account: accounts.credit
    })
  })

module.exports = router
