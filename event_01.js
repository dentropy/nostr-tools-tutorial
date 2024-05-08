import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { Relay } from 'nostr-tools'

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
