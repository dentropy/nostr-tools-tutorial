
import { fetchRelayInformation } from 'nostr-tools/nip11'


let relay_url = await 'wss://relay.newatlantis.top'
if(process.env.NOSTR_RELAY_URL != undefined){
  if(String(process.env.NOSTR_RELAY_URL).slice(0, 4) == "ws://" || String(process.env.NOSTR_RELAY_URL.slice(0, 5)) == "wss://"){
    relay_url = process.env.NOSTR_RELAY_URL
  }  
  console.log("Using Relay: " + String(process.env.NOSTR_RELAY_URL))
}
const relay = await Relay.connect(relay_url)



let relay_info = await fetchRelayInformation(relay_url)

console.log(relay_info)