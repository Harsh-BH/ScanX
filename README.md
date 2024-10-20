# ScanX
**Unmask the Truth: Blockchain-Powered Verification for Media and Text Authenticity.**

**ScanX** addresses a growing concern in both education and professional settings: distinguishing AI-generated content from authentic human work. With the rise of AI tools like ChatGPT and advanced image and video generators, it's increasingly difficult to verify whether written assignments, images, or videos are genuine. This presents challenges in maintaining academic integrity and authenticity in media. ScanX leverages cutting-edge machine learning models to accurately detect whether text, images, or videos are AI-generated or real, ensuring that both digital and written submissions are fair and trustworthy.

## Features

### Blockchain Based Data Storage

**ScanX** leverages blockchain technology to enhance the **security and integrity** of user profiles by securely storing uploaded files—be it videos, images, or texts—along with their corresponding analyses as hashed data. This ensures that each user’s information is protected against unauthorized access and tampering. By converting these files and analyses into hashes, ScanX maintains a **permanent and immutable record** on the blockchain, providing users with verifiable proof of their submissions and analyses. Additionally, all on-chain transactions are meticulously recorded, fostering **transparency** and trust in the system while enabling users to easily track and manage their interactions with the platform.

## Challenges we ran into

1. Since the models we used are quite large, we pushed the backend on GitHub and uploaded the models separately on a drive link. We tried to use the aws hosting services but its free tier is only for CPU, not for GPU. Since our project requires GPU, we had to host the backend locally on GitHub. 

2. The team members had to put in a lot of efforts to make the website resposive. There was a long process of acceptance and rejection of page design ideas before unanimously agreeing on the final designs.

## Technologies we used
**Frontend:** Vite+React, Tailwind CSS, Coinbase Smart Wallet, Base Onchain Kit, Three.js
**Backend:** Flask, Tensorflow, Transformers, Open CV, Hugging Face Models
**Blockchain:** Solidity, Base Sepolia Network

## Links
[GitHub Repository](URL)
[Website](URL)
[Drive Link](URL)
[Demo Video](URL)
[Smart Contract](URL)

## Cover Image
<img src="Screenshot from 2024-10-21 03-40-59.png" width="400" height="300">

## Pictures

<img src="Screenshot from 2024-10-21 03-36-41.png" width="400" height="300">
<img src="Screenshot from 2024-10-21 03-44-13.png" width="400" height="300">
<img src="Screenshot from 2024-10-21 03-44-24.png" width="400" height="300">
<img src="Screenshot from 2024-10-21 03-46-49.png" width="400" height="300">
<img src="Screenshot from 2024-10-21 03-46-25.png" width="400" height="300">
<img src="Screenshot from 2024-10-21 03-43-38.png" width="400" height="300">

## Logo
<img src="1000194939_x16_fast.jpg" alt="ScanX Logo" width="300" height="300">

## Set-up Frontend 

To clone this repository to your local machine, follow these steps:

1. Open your terminal or command prompt.

2 **Coinbase Wallet Extension**: You should have the [Coinbase Wallet Extension](https://www.coinbase.com/wallet) installed in your browser and set up with a wallet account.

3. **Connect to the Base Sepolia Network**: Make sure your wallet is connected to the **Base Sepolia Network** with the following configurations:

   - **Network Name**: Base Sepolia
   - **RPC URL**: `https://chain-proxy.wallet.coinbase.com?targetName=base-sepolia`
   - **Chain ID**: 84532
   - **Currency Symbol**: ETH
   - **Block Explorer URL**: [https://sepolia.basescan.org](https://sepolia.basescan.org)

   > **Tip:** You can add this network in your Coinbase Wallet by going to the "Settings" section in the extension, selecting "Networks," and then clicking "Add Network." Enter the above details to configure it correctly.

4. Run the following command:

   ```bash
   git clone https://github.com/Harsh-BH/ScanX.git
5. Run the following command:

   ```bash
   npm install 

## Set-up Backend 

To clone this repository to your local machine, follow these steps:

1. Open your terminal or command prompt.
2. Open this Drive Link [Drive](https://drive.google.com/drive/folders/1yK_jxG7ggMf6rmQJ-aU2YClb1iuCWwCm?usp=sharing)
3. Download **model_text** folder and **xception_deepfake_image_5o.h5** file.
4. Paste the downloaded folder and file directly in the ScanX-Backend folder.
6. Run the following command:

   ```bash
   https://github.com/Harsh-BH/ScanX-Backend.git

7.Make a python environment and Run the following command:

   ```bash
   pip install -r requirements.txt
   


