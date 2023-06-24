const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

const user1 = {
  privateKey:
    "438aee2be69e12401249bd773954c94e77e5f7e227044f2f88303f74177bfb14",
  message: "user1isJareth",
}
const user2 = {
  privateKey:
    "5120967498ac2eb20cb8b099347912bd5d8bb4fe57950f550583492db242db2e",
  message: "user2isJohn",
}
const user3 = {
  privateKey:
    "fd172dab529aab27c8b0807e3dc2087d40556d13bad00997f2cea00ea8add4f3",
  message: "user3isClaris",
}

const bytes = utf8ToBytes("user1isJareth")
const hashMsg = keccak256(bytes)
const hexMsg = toHex(hashMsg)

const signature = (user) => {
  const signature = secp256k1.sign(hexMsg, user.privateKey)
  return signature
}

const user1Signature = signature(user1)
const user2Signature = signature(user2)
const user3Signature = signature(user3)

console.log("user1:", user1Signature.recoverPublicKey(hashMsg))
console.log("user2:", user2Signature)
console.log("user3:", user3Signature.recoverPublicKey(hashMsg))
