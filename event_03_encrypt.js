import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { encrypt, decrypt } from 'nostr-tools/nip04'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { Relay } from 'nostr-tools'
import { finalizeEvent, verifyEvent } from 'nostr-tools'


let relay_url = await 'wss://relay.newatlantis.top'
if(process.env.NOSTR_RELAY_URL != undefined){
  if(String(process.env.NOSTR_RELAY_URL).slice(0, 4) == "ws://" || String(process.env.NOSTR_RELAY_URL.slice(0, 5)) == "wss://"){
    relay_url = process.env.NOSTR_RELAY_URL
  }  
  console.log("Using Relay: " + String(process.env.NOSTR_RELAY_URL))
}
const relay = await Relay.connect(relay_url)


const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key_0 = privateKeyFromSeedWords(mnemonic, "", 0)
let secret_key_1 = privateKeyFromSeedWords(mnemonic, "", 1)
let public_key_0 = getPublicKey(secret_key_0)
let public_key_1 = getPublicKey(secret_key_1)

let ciphertext = await encrypt(secret_key_0, public_key_1, 'hello')

let decrypted_text = await decrypt(secret_key_1, public_key_0, ciphertext)

console.log(ciphertext)
console.log(decrypted_text)

let signedEvent = finalizeEvent({
    kind: 4,
    created_at: Math.floor(Date.now() / 1000),
    tags: [ 
      [public_key_1]
    ],
    content: ciphertext,
  }, secret_key_0)
  
let isGood = verifyEvent(signedEvent)

console.log("\nisGood")
console.log(isGood)


console.log("\nsignedEvent")
console.log(signedEvent)

await relay.publish(signedEvent)