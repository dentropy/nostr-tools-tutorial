import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key = privateKeyFromSeedWords(mnemonic, "", 0)
let public_key = getPublicKey(secret_key)



import { finalizeEvent, verifyEvent } from 'nostr-tools'

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

for(var i = 0; i < 1410720; i += 1000){

    console.log(`message_length = ${i}`)
    let signedEvent = finalizeEvent({
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: generateRandomString(i),
    }, secret_key)
    
    // let isGood = verifyEvent(signedEvent)
    // console.log("\nsignedEvent")
    // console.log(signedEvent)
    // console.log("\nisGood")
    // console.log(isGood)

    await relay.publish(signedEvent)
}
