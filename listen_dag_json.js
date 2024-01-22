import { Relay } from 'nostr-tools'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN



import { encode, decode } from '@ipld/dag-json'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'

import * as dagPB from '@ipld/dag-pb'
import { code } from 'multiformats/codecs/json'



const relay = await Relay.connect('ws://localhost:7000')
console.log(`\nconnected to ${relay.url}`)
relay.subscribe([
    {
        authors: ['a582c706dad3a703d6c0211dc25e6bb2cbc9081ced7c2adbab91150b905645a7'],
    },
  ], {
    async onevent(event) {
        console.log('we got the event we wanted:', event)
        let encoded = encode(event)
        const hash = await sha256.digest(encoded)
        const cidv0 = CID.create(0, dagPB.code, hash)
        const cidv1 = CID.create(1, code, hash)

        console.log("obj")
        console.log(event)
        console.log("\ncidv0")
        console.log(cidv0)
        console.log("\ncidv1")
        console.log(cidv1)
    },
    oneose() {
      sub.close()
    }
  })