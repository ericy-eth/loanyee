import Image from "next/image"
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon' //Randomly generated profiles
import USDC from "./cryptologos/usdc.js" //USDC svg component
import ETH from "./cryptologos/eth.js" //ETH svg component
import DAI from "./cryptologos/dai.js"
import USDT from "./cryptologos/usdt.js" //Currently not wokring (hydration error)

export default function BorrowerProfile({index,data}){

    // If this is the first profile in the list, do not render the border at the top
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


    return(
        <div  className={borrowerProfileCSS} >
            {/* Account profile and address */}
            <div className="FristItem text-xl mt-5 ml-5 flex gap-2 col-span-2  items-center ">
            <Jazzicon className="dismeterrr" diameter={40} seed={jsNumberForAddress(data.borrowerAddress)} />
               <div className="fontWight"> {shortenAddress(data.borrowerAddress)} </div>
            </div>
            {/* Currency and Amount */}
            <div className="secItem text-xl mt-5 ml-8 flex gap-2 col-span-2 items-center">             
                {data.currency=="USDC" && 
                <USDC width="1.6rem"></USDC>}
                {data.currency=="ETH" &&
                <ETH width="1.6rem"></ETH>}
                <div className="fontWight">{data.value} {data.currency}</div>
            </div>
            {/* Loan Maturity, Credit Score, Salary History, and APR */}
          <div className="Value col-span-2 ml-10 mt-5  text-xl "><div className="fontWight">{data.maturity}</div> </div>
            <div className="Maturity col-span-2  mt-5 ml-8 text-xl"><div className="fontWight">{data.creditScore}</div></div>
            <div className="Credit col-span-2 ml-12  mt-5 text-xl"><div className="fontWight">{data.salaryHistory}</div></div>
            <div className="APR col-span-2 ml-20 mt-5 text-xl"><div className="fontWight">{data.APR}</div></div>

            {/* Status Indicator */}
            <div className="Status text-lg ml-5 text-green-600 mt-5 flex gap-2 items-center col-span-1" >
                {/* {data.status == "Active" && <div className="w-5 h-5 rounded-full bg-green-400"/>}
                {data.status == "Inactive" && <div className="w-5 h-5 rounded-full bg-red-400"/>} */}
                <div className="fontWight">{data.status}</div>
            </div>
        </div>
    )
}