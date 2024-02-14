import { Relay } from 'nostr-tools'
import 'websocket-polyfill' // UNCOMMENT WHEN USING BUN



import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { encrypt, decrypt } from 'nostr-tools/nip04'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'

const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp"
let mnemonic_validation = validateWords(mnemonic)
let secret_key_0 = privateKeyFromSeedWords(mnemonic, "", 0)
let secret_key_1 = privateKeyFromSeedWords(mnemonic, "", 1)
let public_key_0 = getPublicKey(secret_key_0)
let public_key_1 = getPublicKey(secret_key_1)

async function decode_cyphertext(ciphertext){
    let decrypted_text = await decrypt(secret_key_1, public_key_0, ciphertext)
    console.log("\ndecrypted_text")
    console.log(decrypted_text)
}


const relay = await Relay.connect('ws://localhost:7000')
console.log(`\nconnected to ${relay.url}`)
relay.subscribe([
    
    {
        kinds: [4],
        authors: ['a582c706dad3a703d6c0211dc25e6bb2cbc9081ced7c2adbab91150b905645a7'],
    },
  ], {
    onevent(event) {
      console.log('we got the event we wanted:', event)
      decode_cyphertext(event.content)
    },
    oneose() {
      sub.close()
    }
  })