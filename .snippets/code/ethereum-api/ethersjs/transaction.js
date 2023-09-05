// Import ethers
import { ethers } from 'ethers';

// Define network configurations
const providerRPC = {
  EvmContainer: {
    name: 'dancebox-evm-container',
    rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};

// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.EvmContainer.rpc, {
  chainId: providerRPC.EvmContainer.chainId,
  name: providerRPC.EvmContainer.name,
});

// Define accounts and wallet
const accountFrom = {
  privateKey: 'YOUR_PRIVATE_KEY_HERE',
};
const addressTo = 'ADDRESS_TO_HERE';
const wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// Create send function
const send = async () => {
  console.log(
    `Attempting to send transaction from ${wallet.address} to ${addressTo}`
  );

  // Create transaction
  const tx = {
    to: addressTo,
    value: ethers.parseEther('1'),
  };

  // Send transaction and get hash
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

// Call the send function
send();