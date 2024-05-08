// const WebSocket = require('ws');
import WebSocket from "ws";


let relay_url = await 'wss://relay.newatlantis.top'
if (process.env.NOSTR_RELAY_URL != undefined) {
    if (String(process.env.NOSTR_RELAY_URL).slice(0, 4) == "ws://" || String(process.env.NOSTR_RELAY_URL.slice(0, 5)) == "wss://") {
        relay_url = process.env.NOSTR_RELAY_URL
    }
}
console.log("Using Relay: " + relay_url)


var ws = new WebSocket(relay_url);


let subscription_query = [
    "REQ",
    "my-sub",
    {
        kinds: [],
        authors: [],
    }
]


// send a subscription request for text notes from authors with my pubkey
ws.addEventListener('open', function (event) {
    // ws.send('["REQ", "my-sub", {"kinds":[], "authors":[]}]');
    ws.send(JSON.stringify(subscription_query))
});
// print out all the returned notes
ws.addEventListener('message', function (event) {
    if (JSON.parse(event.data)[2] != null)
        console.log('Note: ', JSON.parse(event.data)[2]);
});