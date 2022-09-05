import Image from "next/image"
import { BlockieProfile } from "./blockie"
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import USDC from "../public/image/usdc"

export default function BorrowerProfile({data}){
  
    return(
        <>
            <div class=" border-t-2 py-5 px-5 flex justify-between text-xl items-center">
                
                <div class="flex gap-5  items-center">
                <Jazzicon diameter={50} seed={jsNumberForAddress('0x1118121141112341111611141312111111111111')} />
                    {data.borrowerAddress}
                </div>
                <div class="flex gap-2 items-center">
                    <USDC></USDC>
                    {data.value} USDC
                </div>
                <div>{data.maturity}</div>
                <div>{data.creditScore}</div>
                <div>{data.salaryHistory}</div>
                <div>{data.APR}</div>

                <div class="flex gap-2 items-center" >

                <div class="w-5 h-5 rounded-full bg-lime-500"></div>
                    {data.status}
                </div>
            </div>
        </>
    )
}