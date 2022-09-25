import { useState, useEffect } from "react"

import USDC from "../cryptologos/usdc.js" //USDC svg component
import ETH from "../cryptologos/eth.js" //ETH svg component
import DAI from "../cryptologos/dai.js"
import USDT from "../cryptologos/usdt.js"
import { ethers } from "ethers"


export default function SetupLoan({setFunctions, formState, APY, creditScore}){

    

    const [openMenuCurrency, setOpenMenuCurrency] = useState(false)

    function toggleMenuCurrency(){
        if(openMenuCurrency == false){
            setOpenMenuCurrency(true)
        }else{
            setOpenMenuCurrency(false)
        }
    }

    const handleCurrency =  event=> {
        setFunctions.setCurrency(event.currentTarget.id)
        setOpenMenuCurrency(false)

    }

    const [openMenuDuration, setOpenMenuDuration] = useState(false)

    function toggleMenuDuration(){
        if(openMenuDuration == false){
            setOpenMenuDuration(true)
        }else{
            setOpenMenuDuration(false)
        }
    }

    const handleDuration = event=>{
        setFunctions.setLoanDurationType(event.currentTarget.id)
        setOpenMenuDuration(false)
    }

    return(
        <div class="max-h-100">


            <h1 class="flex  mt-8 font-bold text-2xl">
            Setup Loan 🔧
            </h1>
            <div class="flex flex-row mt-5 bg-slate-200 rounded-md p-3  gap-1">
            💡
                <h2 class="ml-3 text-gray-500 text-md font-normal">
                     Current Interest Rate: <b>{APY*100}%</b>
                </h2>
                
                
            </div>
            
        <div class="bt-5 flex flex-col gap-5 mt-5">
            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold">
                Borrow Amount
                </h2>
                <div class="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
                    <input style={{outline:"none"}} value={formState.borrowAmount} onChange={(event)=>setFunctions.setBorrowAmount(event.target.value)} placeholder="0.0" maxLength="9" class="col-span-4" />
        
                    {/* <!-- Toggle Menu--> */}
                    <div class="relative inline-block text-left col-span-1">
                    <div>
                    <button onClick={toggleMenuCurrency} type="button" class="inline-flex items-center gap-2 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {formState.currency} {formState.currency=="USDC" && <USDC width="50px"></USDC>} {formState.currency=="USDT" && <USDT width="50px"></USDT>} {formState.currency=="DAI" && <DAI width="25px"></DAI>}
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                    </button>
                    </div>
                    {openMenuCurrency &&
                    <div class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                    <button onClick={handleCurrency} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="USDC">USDC <USDC width="1.5rem"></USDC></button>
                    <button onClick={handleCurrency} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="USDT">USDT <USDT width="1.5rem"></USDT> </button>
                    <button onClick={handleCurrency} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="DAI">DAI <DAI width="1.5rem"></DAI></button>
                    </div>
                    </div>}
                    </div>

                </div>
     

 
            </div>

           
            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold">
                    Loan Duration
                </h2>
                <div class="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
                    <input style={{outline:"none"}} placeholder="0" value={formState.loanDuration} onChange={(event)=>setFunctions.setLoanDuration(event.target.value)} class="col-span-4">
                    </input>
                    {/* Toggle Menu */}
                    <div class="relative inline-block text-left col-span-1">
                        <div>
                        <button onClick={toggleMenuDuration}  type="button" class="inline-flex items-center gap-2 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                       {formState.loanDurationType}
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                        </button>
                        </div>
                        {openMenuDuration &&
                        <div class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                        <button onClick={handleDuration} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="Day">Day</button>

                        <button onClick={handleDuration} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="Month">Month</button>
                        <button onClick={handleDuration} class="flex items-center gap-2 text-gray-700 px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="Year">Year</button>
                        </div>
                        </div>}
                        </div>
                </div>
                

            </div>

            <div class="flex flex-col gap-2">
                <h2 class="text-lg font-semibold">
                    Employer Address
                </h2>
                <div class="grid grid-cols-5 border-2 px-5 rounded-md text-lg w-full p-3 border-gray-200">
                    <input style={{outline:"none"}} placeholder="0x..." value={formState.employerAddress} onChange={(event)=>setFunctions.setEmployerAddress(event.target.value)} class="col-span-4">
                    </input>
                  
                </div>
                

            </div>
            {formState.formIsEmpty && 
               <div class="flex flex-row items-center mt-5 bg-slate-200 rounded-md p-3  gap-1">
                <div class="w-4 h-4 rounded-full bg-red-400 ml-3"/>
                <h2 class="ml-3 text-gray-500 text-md font-normal">
                    Form Cannot Be Empty
                </h2>
                
                
            </div>

            }
         
            
            

            
          
            
          
            
        </div>
       
        </div>
    
    )
}