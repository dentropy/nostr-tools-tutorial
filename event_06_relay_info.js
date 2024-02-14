
import { fetchRelayInformation } from 'nostr-tools/nip11'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

let relay_info = await fetchRelayInformation('ws://localhost:7000')

console.log(relay_info)