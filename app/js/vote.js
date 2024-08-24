<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.5.2/web3.min.js"></script>
<script>
        const contractAddress = '0x2C8Cb6171925080775684eB683CA527979C59069';
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "uint8",
                        "name": "_candidate",
                        "type": "uint8"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "bolaTinubuVotes",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getVotes",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "peterObiVotes",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "voters",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "voted",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "vote",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        let contract;
        let userAccount;

        window.onload = async () => {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            const shortAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
            document.getElementById('walletAddressText').textContent = shortAddress;
            contract = new web3.eth.Contract(contractABI, contractAddress);
        };

        async function vote(candidate) {
            try {
                await contract.methods.vote(candidate).send({ from: userAccount });
                alert('Vote successful!');
            } catch (error) {
                console.error('Error voting:', error);
                alert('Error - think you could vote twice huh?');
            }
        }

        async function viewResults() {
            try {
                const tinubuVotes = await contract.methods.bolaTinubuVotes().call();
                const obiVotes = await contract.methods.peterObiVotes().call();
                alert(`Results:\nBola Tinubu: ${tinubuVotes}\nPeter Obi: ${obiVotes}`);
            } catch (error) {
                console.error('Error fetching results:', error);
                alert('Failed to fetch results. Please try again.');
            }
        }
    </script>
