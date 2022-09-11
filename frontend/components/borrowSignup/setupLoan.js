// import bootstrap from "bootstrap"

export default function SetupLoan(){
    return(
        <div>


            <h1 class="flex  mt-8 font-bold  justify-center text-2xl">
            Setup Loan
        </h1>
        <div class="bt-5 flex flex-col gap-5 mt-5">
            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold">
                Borrow Amount
                </h2>
                <input placeholder="0.0" class="border-2 rounded-md text-lg w-full p-3 border-gray-200">
  
                </input>

 
            </div>
            
            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold">
                    Loan Duration
                </h2>
                <input placeholder="2 months" class="border-2 rounded-md text-lg w-full p-3 border-gray-200">
                </input>
            </div>
            
        </div>
       
        </div>
    
    )
}