
import Link from "next/link"

import { ethers } from "ethers";

import AccountHistory from "../components/borrowSignup/accountHistory";
import SetupLoan from "../components/borrowSignup/setupLoan";
import Completed from "../components/borrowSignup/completed";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { list } from "postcss";



export default function Borrow(){


    const [currentItem, setCurrentItem] = useState(0)

    const {user, setUser} = useContext(UserContext)

    const [isWalletConnected, setWalletConnected] = useState()


    // Form Data
    
    const [currency, setCurrency] = useState("USDC")

    const [borrowAmount, setBorrowAmount] = useState(0)

    const [loanDuration, setLoanDuration] = useState(0)

    const [loanDurationType, setLoanDurationType] = useState("Month")

    const setFunctions = {
        setCurrency: setCurrency,
        setBorrowAmount: setBorrowAmount,
        setLoanDuration: setLoanDuration,
        setLoanDurationType: setLoanDurationType
    }

    const formState = {
        currency: currency,
        borrowAmount: borrowAmount,
        loanDuration: loanDuration,
        loanDurationType: loanDurationType
    }

    const APY = 0.10

    //List items
    const listItems = [<AccountHistory/>, <SetupLoan setFunctions={setFunctions} formState={formState} APY={APY} creditScore={3}/>, <Completed formState={formState} APY={APY}/>]

  
    useEffect(()=>{
      checkIfWalletConnected()
    },[])
  

    async function checkIfWalletConnected(){
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
          const provider = new ethers.providers.Web3Provider(ethereum);
    
          if (accounts.length !== 0) {
            const account = accounts[0];
            
    
            console.log("Found an authorized account:", account);
            setWalletConnected(true)
            setUser({account:account})
    
          } else {
            console.log("No authorized account found")
          }
        } catch (error) {
          console.log(error);
        }
      }

      async function connectWallet(){
        const {ethereum} = window
  
        if(!ethereum){
            console.log("No metamask detected");
            return
        }
  
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        const account = accounts[0]
        setUser({account:account})
        setWalletConnected(true)
  
    
    }

    function nextPage(){
       
        setCurrentItem((currentItem)=>currentItem+1)
    }

    function prevPage(){
        setCurrentItem((currentItem)=>currentItem-1)

    }
    
    function submitForm(){

    }
    return(
        <>
        <header class="flex justify-between align-middle py-4 px-8 border-b-2 border-grey-200">
            <Link href="/">
            <a class="text-4xl hover:opacity-60 font-bold py-2 px-5 text-black " > 
            🌀 Loanyee
            </a>
            </Link>


<div class="flex flex-row gap-3 items-center">

    
      <a class="text-md m-0 border-black border-2 text-black bg-white py-1.5 px-5 rounded-full">
        Become a Borrower
      </a>
  

  
    <a onClick={connectWallet} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">
        {!isWalletConnected ? <>Sign In </> :<>Connected!</>}
      </a>

</div>



        </header>
        
        <div class="mt-5 container mx-auto max-w-2xl ">
          
        <header class=" flex flex-row justify-center items-center text-center align-middle gap-5">
                <div class="flex flex-row items-center gap-3">
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            1
                        </p>
                    </div>
                    Prove Account History
                </div>
                <ArrowForwardIosIcon/>
                {/* "flex flex-row opacity-50 items-center gap-3" */}
                <div class={currentItem==0 ? "flex flex-row opacity-50 items-center gap-3" :"flex flex-row items-center gap-3" }>
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            2
                        </p>
                    </div>
                    Setup Loan
                </div>
                <ArrowForwardIosIcon/>

                <div class={currentItem<2 ? "flex flex-row opacity-50 items-center gap-3" : "flex flex-row items-center gap-3" }>
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            3
                        </p>
                    </div>
                    Completed
                </div>
            </header>
           {listItems[currentItem]}

           {/* Render Buttons to go back or forward */}
            <div class="flex justify-around mt-5">
            {currentItem>0 &&
                    <button onClick={prevPage} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Back</button>

                }

                {currentItem==2 ?
                    <button onClick={submitForm} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Submit</button>
                            :
                    <button onClick={nextPage} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Continue</button>

                        }
                

            </div>
        </div>
        </>
    )
}