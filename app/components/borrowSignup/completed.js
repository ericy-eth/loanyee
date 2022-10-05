import USDT from "../cryptologos/usdt"
import DAI from "../cryptologos/dai"
import USDC from "../cryptologos/usdc"

import { useState, useEffect, useRef } from "react"

export default function Completed({formState, APY}){

    return(
        <div className="flex flex-col gap-16 max-h-100">

        <div className="flex flex-row items-center mt-8 gap-2">
            <h1 className="font-bold text-2xl">
            Loan Created!
            </h1>
            🎉
            
        </div>

        

        <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Borrowed Amount</p>
                <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                    <div className="font-medium text-lg" >
                        {formState.borrowAmount} {formState.currency} 
                    </div>
                    <DAI width="1.5rem"></DAI>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Annual Interest</p>
                <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                    <div className="font-medium text-lg" >
                        {APY*100}%
                    </div>
                </div>
                


            </div>

            <div className="flex flex-col gap-2 mb-10">
                <p className="text-lg font-semibold">Loan Duration</p>
                <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                <div className="font-medium text-lg" >
                    {formState.loanDuration} month(s)
                </div>

                </div>
            </div>
           
           
            
        </div>

        
       
        
      
        
  
   
    </div>

)
    
 


}