import USDT from "../cryptologos/usdt"
import DAI from "../cryptologos/dai"
import USDC from "../cryptologos/usdc"

import { useState, useEffect, useRef } from "react"




export default function Completed({formState, APY}){

    return(
        <div class="flex justify-center max-h-100">
            
    
        
        <div class="flex  mb-5 ">
                <div class="flex flex-col gap-5   mt-8 font-bold align-center  justify-center text-2xl">
        <div class="flex justify-center">
            Completed!
        </div>

        <div class="flex flex-col gap-1 max-w-2 font-medium">
            <h1 class="text-base">Employer Address</h1>
            <p>{formState.employerAddress}</p>
        </div>
      
        <div class="flex flex-col gap-1 font-semibold">
            <h1 class="text-base">Borrow Amount</h1>
            <p class="flex gap-2">
                {formState.borrowAmount} {formState.currency} {formState.currency=="USDC" && <USDC width="25px"></USDC>} {formState.currency=="USDT" && <USDT width="25px"></USDT>} {formState.currency=="DAI" && <DAI width="25px"></DAI>}</p>
        </div>

        <div class="flex flex-col gap-1 max-w-2 font-medium">
            <h1 class="text-base">Annual Interest</h1>
            <p>{APY*100}%</p>
        </div>

        <div class="flex flex-col gap-1 max-w-2 font-medium">
            <h1 class="text-base">Loan Duration</h1>
            <p>{formState.loanDuration} {formState.loanDurationType}(s)</p>
        </div>

        <div class="flex flex-col gap-1 max-w-2 font-medium">
            <h1 class="text-base">Return Cost</h1>
            <p> {formState.borrowAmount}  {formState.currency} + {parseInt(formState.borrowAmount)*APY*1000}  {formState.currency}</p>
        </div>
        
    </div>
        </div>
        </div>

)
    
 


}