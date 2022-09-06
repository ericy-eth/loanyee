import Image from "next/image"
import { BlockieProfile } from "./blockie"
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import USDC from "../public/image/usdc"

export default function BorrowerProfile({index,data}){

    let borrowerProfileCSS;
    if(index==0){
        borrowerProfileCSS = "py-5 pt-0 grid grid-cols-13 grid-flow-row justify-between text-xl items-center"
    }else{
        borrowerProfileCSS = "py-5 border-t-2 grid grid-cols-13 grid-flow-row justify-between text-xl items-center"

    }
  
    return(
        <>
            <div class={borrowerProfileCSS}>
                
                <div class="flex gap-5 col-span-2  items-center">
                <Jazzicon diameter={50} seed={jsNumberForAddress('0x1118121141112341111611141312111111111111')} />
                    {data.borrowerAddress}
                </div>
                <div class="flex gap-2 col-span-2 items-center">
                    <USDC></USDC>
                    {data.value} USDC
                </div>
                <div class="col-span-2">{data.maturity}</div>
                <div class="col-span-2">{data.creditScore}</div>
                <div class="col-span-2">{data.salaryHistory}</div>
                <div class="col-span-2">{data.APR}</div>

                <div class="flex gap-2 items-center col-span-1" >

                <div class="w-5 h-5 rounded-full bg-green-400"/>
                    {data.status}
                </div>
            </div>
        </>
    )
}