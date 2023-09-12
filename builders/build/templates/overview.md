---
title: Templates
description: Tanssi includes templates to kick-start the development of an Appchain, one for a Substrate-oriented runtime and another featuring full EVM (Ethereum) support.
---

# Templates Overview {: #templates-overview }

## Introduction {: #introduction }

ContainerChains deployed through Tanssi are essentially parachains within the Polkadot ecosystem that are capable of interacting with the relay chain and other parachains. They also contain the necessary functionalities to support the Tanssi protocol.

As presented in the [Included Templates](/learn/tanssi/included-templates#baseline-appchain-template){target=_blank} from the Learn section, Tanssi already provides two templates to jumpstart the development process:

- **[Baseline Appchain template](/learn/tanssi/included-templates/#baseline-appchain-template){target=_blank}** - a template that provides the basic platform to start adding custom logic in a Substrate based Appchain
- **[Baseline EVM (Ethereum Virtual Machine) template](/learn/tanssi/included-templates/#baseline-evm-template){target=_blank}** - a template that provides full Ethereum compatibility

In this article, the required base setup and how to use the templates as a starting point to start building your Appchain are presented.

## Base Setup to Connect to Polkadot {: #base-setup-to-polkadot }

The [Substrate framework](/learn/framework/overview/#substrate-framework){target=_blank}, included in the Polkadot SDK, already provides out-of-the-box support for the basic functionalities every blockchain needs (such as networking, consensus, and so forth), allowing developers to build new solo-chains while focusing on the runtime (state transition function) logic.

To seamlessly integrate a new Appchain into the Polkadot ecosystem, converting a solo chain into a ContainerChain, the Polkadot SDK also includes [Cumulus](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus){target=_blank}, an extension library to make it easy.

Parachains are expected to handle their block production through their own set of collators and expose interfaces to communicate with the relay chain. This allows their state transition to be validated, thus benefiting from the shared security model, to send and receive messages to and from other Parachains, and to manage other aspects, such as:

- **Consensus** - Cumulus adds the necessary functionality to allow the collators to produce, gossip, and validate the blocks, and coordinate with the relay chain to get notified about the block's finality
- **[XCM](https://wiki.polkadot.network/docs/learn-xcm){target=_blank}** - handles the ingestion and dispatch of incoming downward and lateral messages, allowing a ContainerChain to communicate and interoperate with the other sibling chains within the ecosystem
- **Runtime Upgrades** - a runtime upgrade in a ContainerChain must be informed to the relay chain to allow its validators to check on the blocks produced by the collators of the ContainerChains. Cumulus notifies the upgrade to the relay chain and waits the required amount of time (blocks) before enacting the change

The provided templates already implement Cumulus, so they are ready to be customized and deployed through Tanssi to work and operate within the ecosystem without any issues.

More information about how to configure the Cumulus SDK to integrate an Appchain into Polkadot's ecosystem can be found in the [official Cumulus template](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/parachain-template).

## Base Setup to Support the Tanssi Protocol {: #base-setup-supporting-tanssi }

Besides Cumulus, a ContanerChain must implement the following Tanssi modules to support the protocol and benefit safely from Tanssi's block production as a service:

- **Authorities Noting** - registers the set of collators assigned to the ContainerChain by Tanssi
- **Author Inherent** - Allows the collator authoring the block to include its identity to get validated and rewarded

If you don't include these modules in the ContainerChain's runtime, there won't be a method to confirm that the blocks are being generated by trustworthy collators designated by the Tanssi orchestrator. This could create a vulnerability for malicious actors to exploit and compromise the ContainerChain.

More information about Tanssi's block production as a service and the interaction between Tanssi, the relay chain, and your ContainerChain can be found in the [Technical Features](/learn/tanssi/technical-features/#block-production-as-a-service){target=_blank} article.

## Baseline Appchain Template {: #baseline-appchain-template }

Developing a Substrate-based runtime typically involves two primary steps:

1. [Incorporating pre-existing Substrate built-in modules](/builders/build/local/adding-built-in-pallet/){target=_blank} into the runtime
2. [Creating custom modules](/builders/build/local/adding-custom-made-module/){target=_blank} tailored to your specific application needs

Since the provided template already includes the essential configurations for seamless integration into the Polkadot ecosystem and compatibility with the Tanssi protocol, teams interested in constructing an innovative Appchain can use this template as a starting point for adding their custom logic.

Here are some of the features that come with this template:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=_blank}
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=_blank}
- Use the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=_blank} to interact with the Substrate API

By leveraging these features in the template, you can kickstart your Appchain development and customize it to meet your specific requirements and innovations.

## Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

For teams developing their applications on top of an EVM (Ethereum Virtual Machine), this template is a foundational starting point. It contains all the essential modules to add the extra layer of Ethereum compatibility to a Substrate node:

- **`EVM`** - adds the execution layer for Ethereum apps
- **`Ethereum`** - adds the Ethereum block production emulation to allow the RPC nodes (and DApps) to run without any modification
- **`EVMChainId`** - stores the chain identifier that identifies the Ethereum network

Since the template already contains the necessary configuration for seamless integration into the Polkadot ecosystem and for Tanssi protocol compatibility, if the use case is entirely developed on top of the EVM, then this template requires no additional changes in the runtime.

This means that this template is ready to be built as-is and deployed through Tanssi, unlocking many features, such as:

- Utilize Tanssi's [block production as a service](/learn/tanssi/technical-features/#block-production-as-a-service){target=_blank}
- Connect any Ethereum wallet, such as [Metamask](/builders/interact/ethereum-api/wallets/metamask/){target=_blak} and Ledger
- Use well-known Ethereum libraries like [Ethers.js](/builders/interact/ethereum-api/libraries/ethersjs){target=_blank}, [Web3.js](/builders/interact/ethereum-api/libraries/web3js){target=_blank}, [Web3.py](/builders/interact/ethereum-api/libraries/web3py/){target=_blank}, and more
- Deploy EVM smart contracts with tools like [Remix](https://remix.ethereum.org/){target=_blank}, [Hardhat](https://hardhat.org/){target=_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=_blank}, and more
- Use [Polkadot's finality gadget](https://wiki.polkadot.network/docs/learn-consensus#finality-gadget-grandpa){target=_blank}
- Benefit from [Polkadot's shared security model](https://wiki.polkadot.network/docs/learn-parachains#shared-security){target=_blank}
- Use the [Polkadot.js API](/builders/interact/substrate-api/polkadot-js-api){target=_blank} to interact with the Substrate API

## Adapting an Existing Runtime {: #adapting-existing-runtime }

For teams that already have a Substrate runtime built, it will be necessary to implement the required modules and configurations into the runtime. This will ensure that the runtime can evolve into a ContainerChain that can be successfully [deployed through Tanssi](#base-setup-supporting-tanssi) and [run properly within Polkadot](#base-setup-integrating-into-polkadot).

Failing to do so might lead to reduced interoperability within the ecosystem and unnecessary exposure to vulnerabilities.

### Adding Cumulus Support {: #adding-cumulus-support }

If the runtime is set up as a solo chain, check the official [Cumulus template](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/parachain-template){target=_blank} or any of the templates available in the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=_blank} for a reference setup.

### Adding Tanssi Protocol Support {: #adding-tanssi-support }

To support the Tanssi protocol, it will be necessary to add [the modules](#base-setup-supporting-tanssi) through the following steps:

1. Include the dependencies in the `Cargo.toml` manifesto (usually located in the root folder). Open the `Cargo.toml` file and add the modules in the `dependencies` section

    ```toml
    [dependencies]
    ...
    pallet-cc-authorities-noting = { 
        git = "https://github.com/moondance-labs/tanssi", 
        branch = "master", default-features = false 
    }
    pallet_authorities_noting = {
        git = "https://github.com/moondance-labs/moonkit",
        branch = "tanssi-polkadot-v0.9.43", default-features = false
    }
    ...
    ```

2. Configure the modules. Open the file `lib.rs` located in the folder `*/runtime/src` and add the configuration for both modules:

    ```rust
    impl pallet_author_inherent::Config for Runtime {
        type AuthorId = NimbusId;
        type AccountLookup = tp_consensus::NimbusLookUp;
        type CanAuthor = pallet_cc_authorities_noting::CanAuthor<Runtime>;
        type SlotBeacon = tp_consensus::AuraDigestSlotBeacon<Runtime>;
        type WeightInfo = 
            pallet_author_inherent::weights::SubstrateWeight<Runtime>;
    }

    impl pallet_cc_authorities_noting::Config for Runtime {
        type RuntimeEvent = RuntimeEvent;
        type SelfParaId = parachain_info::Pallet<Runtime>;
        type RelayChainStateProvider = 
            cumulus_pallet_parachain_system::RelaychainDataProvider<Self>;
        type AuthorityId = NimbusId;
        type WeightInfo = 
            pallet_cc_authorities_noting::weights::SubstrateWeight<Runtime>;
    }
    ```

    Note that this configuration is agnostic from the use case

3. Declare the modules as part of the runtime. In the same `lib.rs` file, located in the folder `*/runtime/src`, add the modules to the construction of the runtime:

    ```rust
    construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        ...
        // ContainerChain
        AuthoritiesNoting: pallet_cc_authorities_noting = 50,
        AuthorInherent: pallet_author_inherent = 51,
        ...
    }
    ```

4. Make sure your Header is configured as follows:

    ```rust
    type Header = generic::Header<BlockNumber, BlakeTwo256>;
    /// An index to a block.
    pub type BlockNumber = u32; 
    ```

5. Add the block executor, to allow the validators in the relay chain to check that the authors are the collators assigned by Tanssi (and not a malicious actor)

    ```rust
    cumulus_pallet_parachain_system::register_validate_block! {
        Runtime = Runtime,
        BlockExecutor = pallet_author_inherent::BlockExecutor::<Runtime, Executive>
        CheckInherents = CheckInherents,
    }
    ```