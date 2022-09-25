const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: ''},
    body: '{"chain":"polygon","name":"Type your NFT name here","description":"Type your NFT description here","file_url":"Add your file URL here","mint_to_address":"Add your wallet address here"}'
  };
  export default function mintLoanNft(url){
    return fetch('https://api.nftport.xyz/v0/mints/easy/${url}', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }
