import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key = privateKeyFromSeedWords(mnemonic, "", 0)
let public_key = getPublicKey(secret_key)

console.log("mnemonic")
console.log(mnemonic)
console.log("\nmnemonic validation")
console.log(mnemonic_validation)
console.log("\nsecret_key")
console.log(secret_key)
console.log("\npublic_key")
console.log(public_key)



import { finalizeEvent, verifyEvent } from 'nostr-tools'

let signedEvent = finalizeEvent({
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'hello',
}, secret_key)

let isGood = verifyEvent(signedEvent)


console.log("\nsignedEvent")
console.log(signedEvent)
console.log("\nisGood")
console.log(isGood)


import { Relay } from 'nostr-tools'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

const relay = await Relay.connect('ws://localhost:7000')
console.log(`\nconnected to ${relay.url}`)


relay.subscribe([
    {
      kinds: [1],
      authors: [public_key],
    },
  ], {
    onevent(event) {
      console.log('got event:', event)
    }
  })



console.log("\nsignedEvent")
console.log(signedEvent)

await relay.publish(signedEvent)
