import rocifi from "../../public/image/rocifi.jpeg"
import Image from "next/image"

import CopyButton from "../utilityLogos/copyButton"

export default function EmployerApproval(){
    return(
        <div class="flex flex-col gap-16 max-h-100">

        <div class="flex flex-col mt-8 gap-2">
            <h1 class="font-bold text-2xl">
            Get Employer Approval 🤝
            </h1>
            <p class="text-stone-500">
                Ask your employer to change the destination of the cash flow to the new address.
            </p>
        </div>

        <div class="flex flex-col gap-2" >
            <p class="text-lg font-semibold">Original Recipient Address</p>
            <div class="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
            <div class="font-medium" >
                0x8324738527428324
            </div>

            </div>
            
        </div>

        <div class="flex flex-col gap-2 mb-10" >
            <p class="text-lg font-semibold">Loan Contract Address</p>
            <div class="flex flex-row bg-[#F8F8F8] rounded-md p-3 items-center  gap-2">

                <div class="font-medium">loanyee.eth</div>

                <CopyButton></CopyButton>


            </div>
            
        </div>
       
        
      
        
  
   
    </div>
    )
    }