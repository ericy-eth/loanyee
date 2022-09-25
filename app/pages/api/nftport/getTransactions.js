const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: ''}
  };
  
export default function getTransactions(address){
   return fetch('https://api.nftport.xyz/v0/transactions/accounts/${address}?chain=ethereum', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
  
