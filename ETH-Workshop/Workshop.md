# Smart Contracts on Polkadot

The Polkadot Relay Chain is a layer 0 blockchain, does not support smart contracts natively. However, parachains which are layer 1 blockchains on Polkadot are equipped with the functionality to support smart contracts.

The two primary supported smart contract environments are ink! and EVM. There are multiple parachains that support both environments.

Substrate presently supports smart contracts out-of-the-box in several ways:

- The EVM pallet offered by [Frontier]([Frontier](https://github.com/paritytech/frontier)). Frontier is the suite of tools that enables a Substrate chain to run Ethereum contracts (EVM) natively with the same API/RPC interface, Ethereum exposes on Substrate.

- The [Contracts pallet](https://github.com/paritytech/substrate/blob/master/frame/contracts/) in the FRAME library for Wasm-based contracts.

### Prerequisits for the workshop
1. Install Rust toolchain: [Guide](https://docs.substrate.io/install/rust-toolchain/) 

2. Install Solang, the Solidity compiler to WASM: [Installing Solang](https://solang.readthedocs.io/en/v0.3.2/installing.html)

2. Clone the repository for this workshop:
`git clone https://github.com/AlexD10S/ETH-Workshop`

    That's basically a fork of the [Frontier Parachain Template](https://github.com/paritytech/frontier-parachain-template), which is a ready-to-use EVM-based parachain (based on the Frontier project), where I have added the pallet-contracts.


### Set up the environment
Set up the testing environment with Zombienet. [Zombienet](https://github.com/paritytech/zombienet) is a tool to easily spawn ephemeral Polkadot/Substrate networks and perform tests against them.

You can download executables of the Zombienet CLI from [paritytech/zombienet/releases](https://github.com/paritytech/zombienet/releases)


- Download the Zombienet CLI according to your operating system.

 💡 Tip: If you want the executable to be available system-wide then make sure you place it in one of your `$PATH` directories.
```sh
wget https://github.com/paritytech/zombienet/releases/download/v1.3.30/zombienet-macos
chmod +x zombienet-macos 
cp zombienet-macos /usr/local/bin
```
Then invoke it anywhere like :
```sh 
zombienet-macos --help
```

For our tutorial we are going to start a Relay Chain (Polkadot) and our Parachain, for that we have to generate the binaries:

In our repository:
```sh 
mkdir bin
```

Now we will build the Polkadot binary. If you’re setting up the test network on Linux, you can download the Polkadot binary from [Releases](https://github.com/paritytech/polkadot/releases) into your working folder. If you’re setting up the test network on macOS or want to compile the binary yourself, continue to the next step.
```sh 
git clone --branch release-v1.0.0 https://github.com/paritytech/polkadot.git

cd polkadot

cargo build --release
```

We take the binary `./target/release/polkadot` and paste it in the bin folder of our repository.

For a step by step guide on how to run it check this guide: [Set up a parachain test network](https://docs.substrate.io/test/set-up-a-test-network/)


In our repository now we are going to build the binary of our parachain: 
```sh 
cd frontier-parachain-template && cargo build --release
```

Now you can use Zombienet to run our testing network, in our repository run:
```sh 
zombienet-macos spawn zombienet-config.toml -p native
```

Well done you have a parachain running! 🍻🍻
You can see your parachain on:
https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer 

And the Relay chain here: https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9900#/explorer 


### Deploy Solidity Smart Contract in Smart Contracts pallet

You need Solang installed, go to [Install Solang](https://solang.readthedocs.io/en/v0.3.2/installing.html).

Once installed:
```sh 
cd examples

solang new myToken --target polkadot
```

Replace the flipper.sol with your contract (I took ERC20 from https://docs.openzeppelin.com/contracts/4.x/wizard).

Change the `solang.toml` configuration file to use your name and your imports if you need in:
For this example we need the `openzeppelin-contracts` library (https://github.com/OpenZeppelin/openzeppelin-contracts).
Install it
```sh 
cd myToken

npm install @openzeppelin/contracts
```
And change the config file to import it:
`import_map = { "@openzeppelin" = "./node_modules/@openzeppelin"}`

``` 
solang compile
```

Compiled, you will see a WASM file and a .contract file that contains the metadata! 🍻🍻

##### Let's deploy it locally

https://contracts-ui.substrate.io/

Follow the steps, upload the .contract file and deploy your Smart Contract locally.


### Deploy in Testnets/Production
- There is a testnet that shows you how to connect your parachain in Rococo (The Polkadot Testnet); [Acquire a testnet slot in Rococo](https://docs.substrate.io/tutorials/build-a-parachain/acquire-a-testnet-slot/).

- If you just want to deploy a WASM smart contract in Rococo testnet, there is already a Testnet Parachain that support this
Rococo Contracts, you can connect there with the Contracts UI: https://contracts-ui.substrate.io/?rpc=wss://rococo-contracts-rpc.polkadot.io

Get some ROC tokens with the Faucet: https://use.ink/faucet/ or https://paritytech.github.io/polkadot-testnet-faucet/ 
And deploy the Smart Contract exactly the same way you did it.



If you want to deploy in Production, see this list of Parachains to deploy on Production:
https://wiki.polkadot.network/docs/build-smart-contracts#smart-contract-environments


### Deploy Solidity Smart Contract in EVM pallet
Let's try now to deploy our Solidity Smart Contract directly using the EVM pallet.
We have an example in examples/contract-erc20
```sh 
cd examples/contract-erc20
```

This directory contains typescript script to execute the different steps to deploy and interact with a contract.

Use `npm i` to install dependencies. To create an ERC20 contract, and interact with it via RPC
execute `node_modules/.bin/ts-node create-erc20-rpc.ts` while your
template node is running.

Or you can deploy with your Smart Contract using Remix and interact using Metamask: [How to connect substrate node to metamask?](https://substrate.stackexchange.com/questions/5473/how-to-connect-substrate-node-to-metamask).

More information follow the tutorial [Access EVM accounts](https://docs.substrate.io/tutorials/integrate-with-tools/access-evm-accounts/) or read the [Moonbeam documentation](https://docs.moonbeam.network/learn/features/eth-compatibility/).

### ink! Smart Contract
Follow this [Guide](https://use.ink/getting-started/setup) to install the ink! CLI used to create and deploy an ink! smart contract.

```sh 
cd .. //Let's go out of our repository (is already a rust project and can interfer with our dependencies)
```

Create the contract:
```sh 
cargo contract new flipper
```

This command will create a new project folder named flipper with this content:
flipper
  └─ lib.rs                <-- Contract Source Code
  └─ Cargo.toml            <-- Rust Dependencies and ink! Configuration
  └─ .gitignore

You can compile
```sh 
cd flipper

cargo contract build
``` 
And it will create the following:
target
  └─ ink
    └─ flipper.contract
    └─ flipper.wasm
    └─ flipper.json

flipper.contract is the one you will have to upload in https://contracts-ui.substrate.io/ to deploy your Smart Contract as we did with the Solidity example.

You can also run the tests:
```sh 
cargo tests
```
### Technical Support
https://substrate.stackexchange.com/
https://wiki.polkadot.network/docs/community