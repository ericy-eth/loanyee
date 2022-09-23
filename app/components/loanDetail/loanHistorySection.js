import Jazzicon, { jsNumberForAddress } from 'react-jazzicon' //Randomly generated profiles
import USDC from "../../components/cryptologos/usdc" //USDC svg component
import ETH from "../../components/cryptologos/eth.js" //ETH svg component
import DAI from "../../components/cryptologos/dai.js"
import USDT from "../../components/cryptologos/usdt.js" 


export default function LoanHistorySection({index, data}){
    let borrowerProfileCSS;
    if(index==0){
        borrowerProfileCSS = "py-5 pt-0 grid grid-cols-13 grid-flow-row justify-between text-xl items-center hover:opacity-70 hover:cursor-pointer"
    }else{
        borrowerProfileCSS = "py-5 border-t-2 grid grid-cols-13 grid-flow-row justify-between text-xl items-center hover:opacity-70 hover:cursor-pointer"

    }

    //This is for shortening an address for easy display
    const shortenAddress = (str) => {
        return str.substring(0, 5) + "..." + str.substring(str.length - 3);
    };

    console.log("testing"+data);
    return(
        <div class={borrowerProfileCSS}>
        {/* Account profile and address */}
        <div class="flex gap-5 col-span-3  items-center ">
        <Jazzicon diameter={50} seed={jsNumberForAddress(data.lenderAddress)} />
            {shortenAddress(data.lenderAddress)}
        </div>

        {/* Currency and Amount */}
        <div class="flex gap-2 col-span-2 items-center">
            {data.currency=="USDC" && 
            <USDC width="2rem"></USDC>}
            {data.currency=="USDT" &&
            <USDT width="2rem"></USDT>}
            {data.currency=="DAI" &&
            <DAI width="2rem"></DAI>}
        
            
            {data.value} 
        </div>
        {/* Loan Maturity, Credit Score, Salary History, and APR */}
        <div class="col-span-2">{data.maturity}</div>
        <div class="col-span-2">{shortenAddress(data.contractAddress)}</div>
        <div class="col-span-2">{data.startDate}</div>
        <div class="col-span-1">{data.APY}</div>

        {/* Status Indicator */}
        <div class="flex gap-2 items-center col-span-1" >

            {data.status > 50 && <div class="w-5 h-5 rounded-full bg-green-400"/>} {data.status}
        </div>
    </div>

    )
}