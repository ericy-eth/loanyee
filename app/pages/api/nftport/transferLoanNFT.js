const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: ''},
    body: '{"chain":"polygon","contract_address":"0xC8D297D7b496f86673551c933815B47973FC4a0e","token_id":"1","transfer_to_address":"0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42"}'
  };
  export default function transferLoanNFT(){
    return  fetch('https://api.nftport.xyz/v0/mints/transfers', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }
 