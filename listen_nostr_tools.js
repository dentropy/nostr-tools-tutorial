import {
  Relay
} from 'nostr-tools'
import * as nip19 from 'nostr-tools/nip19'
// import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

let {
  type,
  data
} = nip19.decode("npub1ek36rza32zjc8pec8daz6veyywv55xtemzaxr0saymd04a4r66eqpxphdl")
console.log(data)


let relay_url = await 'wss://relay.newatlantis.top'
if (process.env.NOSTR_RELAY_URL != undefined) {
  if (String(process.env.NOSTR_RELAY_URL).slice(0, 4) == "ws://" || String(process.env.NOSTR_RELAY_URL.slice(0, 5)) == "wss://") {
    relay_url = process.env.NOSTR_RELAY_URL
  }
  console.log("Using Relay: " + String(process.env.NOSTR_RELAY_URL))
}
const relay = await Relay.connect(relay_url)

console.log(`\nconnected to ${relay.url}`)
relay.subscribe([{
  // authors: [data],
  // ids:[],
  // kinds:[], // Numbers
  // since // Unix Time Int
  // until // Unix Time Int
  limit: 3 // Integer

}, ], {
  onevent(event) {
    console.log('Got the event you wanted:\n\n', event)
  },
  oneose() {
    sub.close()
  }
})