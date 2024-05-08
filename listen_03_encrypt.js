import { Relay } from 'nostr-tools'
import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { encrypt, decrypt } from 'nostr-tools/nip04'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'


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
let secret_key_0 = privateKeyFromSeedWords(mnemonic, "", 0)
let secret_key_1 = privateKeyFromSeedWords(mnemonic, "", 1)
let public_key_0 = getPublicKey(secret_key_0)
let public_key_1 = getPublicKey(secret_key_1)

async function decode_cyphertext(ciphertext){
    let decrypted_text = await decrypt(secret_key_1, public_key_0, ciphertext)
    console.log("\ndecrypted_text")
    console.log(decrypted_text)
}


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