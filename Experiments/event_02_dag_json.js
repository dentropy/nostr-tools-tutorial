import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'

const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key = privateKeyFromSeedWords(mnemonic, "", 0)
let public_key = getPublicKey(secret_key)



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
// import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

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



console.log("\nsignedEvent")
console.log(signedEvent)

await relay.publish(signedEvent)


import { encode, decode } from '@ipld/dag-json'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'

import * as dagPB from '@ipld/dag-pb'
import { code } from 'multiformats/codecs/json'


let encoded = encode(signedEvent)
const hash = await sha256.digest(encoded)
const cidv0 = CID.create(0, dagPB.code, hash)
const cidv1 = CID.create(1, code, hash)

console.log("obj")
console.log(signedEvent)
console.log("\ncidv0")
console.log(cidv0)
console.log("\ncidv1")
console.log(cidv1)