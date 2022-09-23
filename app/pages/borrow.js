
import Link from "next/link"

import { ethers } from "ethers";

import abi from "../data/contractABI/LoanFactory.json"

import EmployerApproval from "../components/borrowSignup/employerApproval";
import SetupLoan from "../components/borrowSignup/setupLoan";
import Completed from "../components/borrowSignup/completed";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { list } from "postcss";

const loanABI=  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "registry",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "borrowAmount",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int8",
        "name": "interestRate",
        "type": "int8"
      },
      {
        "indexed": false,
        "internalType": "int8",
        "name": "paybackMonths",
        "type": "int8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "employer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "contract ISuperToken",
        "name": "borrowToken",
        "type": "address"
      }
    ],
    "name": "loanCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "_borrowAmount",
        "type": "int256"
      },
      {
        "internalType": "int8",
        "name": "_interestRate",
        "type": "int8"
      },
      {
        "internalType": "int8",
        "name": "_paybackMonths",
        "type": "int8"
      },
      {
        "internalType": "address",
        "name": "_employer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_borrower",
        "type": "address"
      },
      {
        "internalType": "contract ISuperToken",
        "name": "_borrowToken",
        "type": "address"
      },
      {
        "internalType": "contract ISuperfluid",
        "name": "_host",
        "type": "address"
      }
    ],
    "name": "createNewLoan",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "employmentLoanOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "idToLoan",
    "outputs": [
      {
        "internalType": "contract EmploymentLoan",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loanId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]



export default function Borrow(){


    const [currentItem, setCurrentItem] = useState(0)

    const {user, setUser} = useContext(UserContext)

    const [isWalletConnected, setWalletConnected] = useState()


    // Form Data
    
    const [currency, setCurrency] = useState("USDC")

    const [borrowAmount, setBorrowAmount] = useState()

    const [loanDuration, setLoanDuration] = useState()

    const [loanDurationType, setLoanDurationType] = useState("Month")

    const [employerAddress, setEmployerAddress] = useState();

    const [formIsEmpty, setFormIsEmpty] = useState(false);

    const setFunctions = {
        setCurrency: setCurrency,
        setBorrowAmount: setBorrowAmount,
        setLoanDuration: setLoanDuration,
        setLoanDurationType: setLoanDurationType,
        setEmployerAddress: setEmployerAddress
    }

    const formState = {
        currency: currency,
        borrowAmount: borrowAmount,
        loanDuration: loanDuration,
        loanDurationType: loanDurationType,
        employerAddress: employerAddress
    }

    const APY = 0.10

    //List items
    const listItems = [<SetupLoan setFunctions={setFunctions} formState={formState} APY={APY} creditScore={3}/>,<EmployerApproval/>, <Completed formState={formState} APY={APY}/>]

  
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
        if(currentItem==0){
            if(borrowAmount<=0 || loanDuration <=0 || borrowAmount==null || loanDuration ==null){
                setFormIsEmpty(true);
                return;
            }
            else{
                setFormIsEmpty(false);
            }


        }
       
        setCurrentItem((currentItem)=>currentItem+1)
    }

    function prevPage(){
        setCurrentItem((currentItem)=>currentItem-1)

    }
    
    async function submitForm(){
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(ethereum);        
        const signer = provider.getSigner(user.account)
        const LoanFactoryContract = new ethers.Contract("0x60Fbd177b7B4311ab36134C106A88f337e981Ca9", loanABI, signer)
        const loanId = await LoanFactoryContract.createNewLoan(ethers.utils.parseEther(borrowAmount), 10, loanDuration, employerAddress, user.account, "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9")

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
                    Setup Loan
                </div>
                <ArrowForwardIosIcon/>
                {/* "flex flex-row opacity-50 items-center gap-3" */}
                <div class={currentItem==0 ? "flex flex-row opacity-50 items-center gap-3" :"flex flex-row items-center gap-3" }>
                    <div class="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p class="text-white">
                            2
                        </p>
                    </div>
                    Employer Approval
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
            {formIsEmpty &&  <div class="justify-center mt-5">Loan amount or loan duration cannot be 0</div>}
        </div>
        </>
    )
}