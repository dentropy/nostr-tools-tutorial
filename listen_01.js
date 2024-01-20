import { Relay } from 'nostr-tools'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN

const relay = await Relay.connect('ws://localhost:7000')
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