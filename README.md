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
wget https://github.com/paritytech/zombienet/releases/download/v1.3.69/zombienet-macos
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

Now you can use Zombienet to run our testing network, in our repository run:
```sh 
zombienet-macos spawn zombienet-config.toml -p native
```

Well done you have a parachain running! 🍻🍻
You can see your parachain on:
https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer 

And the Relay chain here: https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9900#/explorer 

