import USDT from "../cryptologos/usdt"
import DAI from "../cryptologos/dai"
import USDC from "../cryptologos/usdc"

import { useState, useEffect, useRef } from "react"




export default function Completed({formState, APY}){

    return(
        <div class="flex flex-col gap-16 max-h-100">

        <div class="flex flex-row items-center mt-8 gap-2">
            <h1 class="font-bold text-2xl">
            Loan Created!
            </h1>
            🎉
            
        </div>

        

        <div class="flex flex-col gap-5">

            <div class="flex flex-col gap-2">
                <p class="text-lg font-semibold">Borrowed Amount</p>
                <div class="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                    <div class="font-medium text-lg" >
                        {formState.borrowAmount} {formState.currency} 
                    </div>
                    <DAI width="1.5rem"></DAI>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <p class="text-lg font-semibold">Annual Interest</p>
                <div class="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                    <div class="font-medium text-lg" >
                        {APY*100}%
                    </div>
                </div>
                


            </div>

            <div class="flex flex-col gap-2 mb-10">
                <p class="text-lg font-semibold">Loan Duration</p>
                <div class="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
                <div class="font-medium text-lg" >
                    {formState.loanDuration} month(s)
                </div>

                </div>
            </div>
           
           
            
        </div>

        
       
        
      
        
  
   
    </div>

)
    
 


}