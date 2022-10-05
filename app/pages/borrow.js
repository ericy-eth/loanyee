import EmployerApproval from "../components/borrowSignup/employerApproval";
import SetupLoan from "../components/borrowSignup/setupLoan";
import Completed from "../components/borrowSignup/completed";


import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { loanFactoryABI } from "../data/contractABI/LoanFactory";
import {usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction} from "wagmi"

import {Rings} from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";




export default function Borrow(){

    const {address:userAddress} = useAccount()

    const [currentItem, setCurrentItem] = useState(0)

   


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
        employerAddress: employerAddress,
        formIsEmpty: formIsEmpty
    }

    const APY = 0.08

    //List items
    const listItems = [<SetupLoan key={1} setFunctions={setFunctions} formState={formState} APY={APY} creditScore={3}/>,<EmployerApproval key={2} />, <Completed key={3} formState={formState} APY={APY}/>]

   //Checks to make sure tx completed already
   const [loanTxCompleted, setLoanTxCompleted] = useState(false)


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

    // const borrowAmountInWeiString = ethers.utils.formatEther(borrowAmountInWei);
    const {config} = usePrepareContractWrite({
        addressOrName:  "0xFB26b9144f13e7D2485C4df2cCbb977660DC01fc",
        contractInterface: loanFactoryABI,
        functionName: "createNewLoan",
        args:[borrowAmount+"000000000000000000", 8, loanDuration, employerAddress, userAddress, "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00", "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9"],
        onSuccess(data) {
            console.log('Success', data)
        },
    })
    const {write:createLoan, isSuccess, data: loanTxData } = useContractWrite(config)

    const {data, isError, isLoading: loanTxPending, isSuccess: loanTxSuccess} = useWaitForTransaction({hash:loanTxData?.hash})

    
    function submitForm(event){
        createLoan()
    }

    if(loanTxSuccess && !loanTxCompleted){
        nextPage()
        setLoanTxCompleted(true)
        
    }

   
    return(
        <>
       
       
        <div className="mt-5 container mx-auto max-w-2xl ">

        <header className=" flex flex-row justify-center items-center text-center align-middle gap-5">
                <div className="flex flex-row items-center gap-3">
                    <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p className="text-white">
                            1
                        </p>
                    </div>
                    Setup Loan
                </div>
                <ArrowForwardIosIcon/>
                {/* "flex flex-row opacity-50 items-center gap-3" */}
                <div className={currentItem==0 ? "flex flex-row opacity-50 items-center gap-3" :"flex flex-row items-center gap-3" }>
                    <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p className="text-white">
                            2
                        </p>
                    </div>
                    Employer Approval
                </div>
                <ArrowForwardIosIcon/>

                <div className={currentItem<2 ? "flex flex-row opacity-50 items-center gap-3" : "flex flex-row items-center gap-3" }>
                    <div className="bg-black rounded-full w-10 h-10 flex align-middle items-center justify-center"> 
                        <p className="text-white">
                            3
                        </p>
                    </div>
                    Completed
                </div>
            </header>
           {listItems[currentItem]}

           {/* Render Buttons to go back or forward */}
            <div className="flex justify-around mt-5">
            {currentItem==2 && <button onClick={prevPage} className="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Back</button>}
            {currentItem==0 && !loanTxPending && <button name="submitBtn" onClick={submitForm} className="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Submit</button>}
            {currentItem==0 && loanTxPending && 
            <button name="submitBtn" disabled className="text-md flex justify-center  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">
              <Rings
                height="50"
                width="50"
                color="#ffffff"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"/>
            </button>
            }

            {currentItem==1 &&
                <button onClick={nextPage} className="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center">Continue</button>
            }



          

            </div>
        </div>
        </>
    )
}