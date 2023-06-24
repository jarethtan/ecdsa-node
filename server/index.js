const express = require("express")
const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  "03eb983bcd065372b0f35f0177f12f2dba9efdc14d7d9792bcc1be10a4523c9292": 100,
  "038d04efefbbb661fde54e66d269c1310aa9b4da426efc5e5a147718f8043416a8": 50,
  "02fdf086bb805b229ecf9bbbabbbba174957ff27fe2334f1cfa28add74068e0068": 75,
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  const { signature, recipient, amount } = req.body
  const recoverKey = async () => {
    await secp256k1.recoverKey()
  }

  setInitialBalance(sender)
  setInitialBalance(recipient)

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
