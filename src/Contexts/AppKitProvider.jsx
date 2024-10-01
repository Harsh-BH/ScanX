import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '9c702d939dc8dcc1aa1c78f525f113d6'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks = [mainnet, arbitrum]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId
})

// 4. Create modal
createAppKit({

  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-font-family': 'Urbanist, sans-serif',   // Customize the base font family
    '--w3m-accent': '#252525',                     // Color used for buttons, icons, labels
    '--w3m-color-mix': '#252525',                  // Color that blends with default colors

    '--w3m-font-size-master': '14px',              // The base pixel size for fonts
    '--w3m-border-radius-master': '12px',          // The base border radius for buttons and components
    '--w3m-z-index': 10                            // The z-index for the modal popup
  }
})

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function ConnectButton({ onConnect }) {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && onConnect) {
      onConnect(); // Trigger the callback when the wallet is connected
    }
  }, [isConnected, onConnect]);

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Wallet connected: {address}</p>
        </div>
      ) : (
        <w3m-button />
      )}
    </div>
  );
}