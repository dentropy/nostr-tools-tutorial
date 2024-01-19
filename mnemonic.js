import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools'
import { generateSeedWords, validateWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'



const mnemonic = "curve foster stay broccoli equal icon bamboo champion casino impact will damp";
// const mnemonic = generateSeedWords()
let mnemonic_validation = validateWords(mnemonic)
let secret_key = privateKeyFromSeedWords(mnemonic, "", 0)
// let secret_key = generateSecretKey()
let public_key = getPublicKey(secret_key)
let uint8_secret_key = new Buffer.from(secret_key, "hex")
let nsec = nip19.nsecEncode(uint8_secret_key)
let npub = nip19.npubEncode(public_key)

console.log("mnemonic")
console.log(mnemonic)
console.log("\nmnemonic validation")
console.log(mnemonic_validation)
console.log("\nsecret_key")
console.log(secret_key)
console.log("\npublic_key")
console.log(public_key)
console.log("\nnsec")
console.log(nsec)
console.log("\nnpub")
console.log(npub)
console.log("\n\nsecret_key")
console.log(secret_key)
console.log("\n\nuint8_secret_key")
console.log(uint8_secret_key)
