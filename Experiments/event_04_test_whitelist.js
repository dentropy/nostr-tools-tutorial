import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'

const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key_000 = privateKeyFromSeedWords(mnemonic, "", 0)
let public_key_000 = getPublicKey(secret_key_000)
let secret_key_001 = privateKeyFromSeedWords(mnemonic, "", 1)
let public_key_001 = getPublicKey(secret_key_001)

console.log(`secret_key_000: ${secret_key_000}`)
console.log(`public_key_000: ${public_key_000}`)
console.log(`secret_key_001: ${secret_key_001}`)
console.log(`public_key_001: ${public_key_001}`)


import { finalizeEvent, verifyEvent } from 'nostr-tools'

let signedEvent_000 = finalizeEvent({
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'hello',
}, secret_key_000)

let signedEvent_001 = finalizeEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: 'hello',
  }, secret_key_001)


// console.log("\nsignedEvent")
// console.log(signedEvent)
// console.log("\nisGood")
// console.log(isGood)


import { Relay } from 'nostr-tools'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

const relay = await Relay.connect('ws://localhost:7000')
console.log(`\nconnected to ${relay.url}`)


// relay.subscribe([
//     {
//       kinds: [1],
//       authors: [public_key],
//     },
//   ], {
//     onevent(event) {
//       console.log('got event:', event)
//     }
//   })



// console.log("\nsignedEvent")
// console.log(signedEvent)

await relay.publish(signedEvent_000)
try {
    await relay.publish(signedEvent_001)
} catch (error) {
    console.log("Error")
    console.log(signedEvent_001)
}
