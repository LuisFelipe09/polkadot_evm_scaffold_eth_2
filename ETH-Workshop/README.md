# Smart Contracts Parachain Template for ETH Workshop

This Parachain template is a fork from [Frontier Parachain Template](https://github.com/paritytech/frontier-parachain-template), which is a ready-to-use EVM-based parachain (based on the [Frontier project](https://github.com/paritytech/frontier)),  where I have added the pallet-contracts.

This is an ideal starting point for any Parachain project that needs to support Solidity and ink! smart contracts, but that wants at the same time to benefit from the flexibility provided by Substrate, and the shared security of the Polkadot relay chain.


## 🚀 Getting Started

### 🦀 Rust Setup

Make sure you have Rust installed along with everything that's needed to compile a substrate node. More details [here](./docs/rust-setup.md).

### 🔧 Build

1. Clone the repository:

```sh
git clone https://github.com/AlexD10S/ETH-Workshop
```

2. Use `cargo` to build the parachain node without launching it:

```sh
cargo build --release
```

### 🕸️ Run a local network
 You will need a compatible release of [Polkadot](https://github.com/paritytech/polkadot) to run a local network. You may also want to use [Zombienet](https://github.com/paritytech/zombienet/releases) (available for Linux and MacOS),  for spinning up a full fledged relay chain - parachain environment. You can find more information about running a local test network [HERE](./docs/zombienet.md)


```sh
zombienet-macos spawn zombienet-config.toml -p native
```

You can see your parachain running on:
https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer 

And the Relay chain here: https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9900#/explorer   


👉  Workshop step-by-step [here](./Workshop.md)

👉 Learn more about parachains [here](https://wiki.polkadot.network/docs/learn-parachains), and parathreads [here](https://wiki.polkadot.network/docs/learn-parathreads).
