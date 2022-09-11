
import Link from "next/link"

import { ethers } from "ethers";

import AccountHistory from "../components/borrowSignup/accountHistory";
import SetupLoan from "../components/borrowSignup/setupLoan";


import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



export default function Borrow(){

    const {user, setUser} = useContext(UserContext)

    const [isWalletConnected, setWalletConnected] = useState()
  
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

    return(
        <>
        <header class="flex justify-between align-middle py-4 px-8 border-b-2 border-grey-200">
            <Link href="/">
            <a class="text-4xl hover:opacity-60 font-bold py-2 px-5 text-black " > 
            🌀 Loanyee
            </a>
            </Link>


<div class="flex flex-row gap-3 items-center">

    <Link href="/borrow">
      <a class="text-md hover:opacity-60 m-0 border-black border-2 text-black bg-white py-1.5 px-5 rounded-full">
        Become a Borrower
      </a>
    </Link>

  
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
                <div class="flex flex-row items-center gap-3">
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            2
                        </p>
                    </div>
                    Setup Loan
                </div>
                <ArrowForwardIosIcon/>

                <div class="flex flex-row items-center gap-3">
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            3
                        </p>
                    </div>
                    Completed
                </div>
            </header>
           
           <SetupLoan/>
        </div>
        </>
    )
}