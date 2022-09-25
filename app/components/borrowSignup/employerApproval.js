import rocifi from "../../public/image/rocifi.jpeg"
import Image from "next/image"

import CopyButton from "../utilityLogos/copyButton"

export default function EmployerApproval(){
    return(
        <div className="flex flex-col gap-16 max-h-100">

        <div className="flex flex-col mt-8 gap-2">
            <h1 className="font-bold text-2xl">
            Get Employer Approval 🤝
            </h1>
            <p className="text-stone-500">
                Ask your employer to change the destination of the cash flow to the new address.
            </p>
        </div>

        <div className="flex flex-col gap-2" >
            <p className="text-lg font-semibold">Original Recipient Address</p>
            <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3  gap-1">
            <div className="font-medium" >
                0x8324738527428324
            </div>

            </div>
            
        </div>

        <div className="flex flex-col gap-2 mb-10" >
            <p className="text-lg font-semibold">Loan Contract Address</p>
            <div className="flex flex-row bg-[#F8F8F8] rounded-md p-3 items-center  gap-2">

                <div className="font-medium">loanyee.eth</div>

                <CopyButton></CopyButton>


            </div>
            
        </div>
       
        
      
        
  
   
    </div>
    )
    }