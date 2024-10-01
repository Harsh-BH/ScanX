import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

export default function ConnectButton({ onConnect }) {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    // Trigger the onConnect callback if the wallet is connected
    if (isConnected && onConnect) {
      onConnect();
    }
  }, [isConnected, onConnect]);

  return (
    <div className="wallet-info">
      {isConnected ? (
        <div className="connected">
          <span>{balance?.formatted} ETH</span>
          <span>{address && `${address.slice(0, 6)}...${address.slice(-4)}`}</span>
        </div>
      ) : (
        <button className="connect-wallet-button">
          Connect Wallet
        </button>
      )}
    </div>
  );
}
