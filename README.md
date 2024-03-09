## nostr-tools-tutorial

#### Nostr Relay Setup

``` bash
wget -O config.toml https://raw.githubusercontent.com/vdo/nostr-rs-relay-compose/main/config.toml

wget -O config.toml https://git.sr.ht/~gheartsfield/nostr-rs-relay/blob/HEAD/config.toml
mkdir data
sudo chown -R 1000 data

# Nostr config.toml is set to run in memory to make testing easier

```

#### Requirements

* Bun (DOES NOT WORK WITH NODEJS)
* Docker
