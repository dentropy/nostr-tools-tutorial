
let domain_names = [
	"https://rogue.earth/.well-known/nostr.json",
	"https://nostrplebs.com/.well-known/nostr.json",
	"https://bitcoinnostr.com/.well-known/nostr.json",
	"https://nostr.com.au/.well-known/nostr.json",
	"https://atyh.net/.well-known/nostr.json",
	"https://jb55.com/.well-known/nostr.json",
	"https://coracle.social/.well-known/nostr.json",
	"https://nostr.build/.well-known/nostr.json",
	"https://final.red/.well-known/nostr.json",
	"https://dergigi.com/.well-known/nostr.json",
	"https://nsec.app/.well-known/nostr.json",
	"https://habla.news/.well-known/nostr.json"	
]

domain_names.forEach(async (domain_name) => {
    try {
        let result = await fetch(domain_name)
        result = await result.json()
        console.log(result)
    } catch (error) {
        console.log("Could not resolve domain name")
        console.log(domain_name)
    }
})
