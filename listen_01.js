import { Relay } from 'nostr-tools'


let relay_url = await 'wss://relay.newatlantis.top'
if(process.env.NOSTR_RELAY_URL != undefined){
  if(String(process.env.NOSTR_RELAY_URL).slice(0, 4) == "ws://" || String(process.env.NOSTR_RELAY_URL.slice(0, 5)) == "wss://"){
    relay_url = process.env.NOSTR_RELAY_URL
  }  
  console.log("Using Relay: " + String(process.env.NOSTR_RELAY_URL))
}
const relay = await Relay.connect(relay_url)


console.log(`\nconnected to ${relay.url}`)
relay.subscribe([
    {
        authors: ['a582c706dad3a703d6c0211dc25e6bb2cbc9081ced7c2adbab91150b905645a7'],
    },
  ], {
    onevent(event) {
      console.log('we got the event we wanted:', event)
    },
    oneose() {
      sub.close()
    }
  })