import Jazzicon, { jsNumberForAddress } from 'react-jazzicon' //Randomly generated profiles
import Redirect from '../components/utilityLogos/redirect';

import Link from 'next/link';

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";
import { useRouter } from 'next/router'
import { useContractRead, useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'



import dataSet from '../data/loanHistoryList.js';
import LoanHistorySection from '../components/loanDetail/loanHistorySection';

import USDC from '../components/cryptologos/usdc';
import DAI from '../components/cryptologos/dai';

import loanFactoryABI from "../data/contractABI/LoanFactory.json"
import employmentLoanABI from "../data/contractABI/EmploymentLoan.json"
import { writeContract } from '@wagmi/core';
import erc20ABI from "../data/contractABI/erc20TokenABI.json"


//Helper Functions


export default function BorrowerDetail() {
  function shortenAddress(str){
    return str.substring(0, 5) + "..." + str.substring(str.length - 3);
  };

  //Router for passing data between pages
  const router = useRouter();
  const borrowerData = router.query;

  
  const { user, setUser } = useContext(UserContext);
  console.log("Borrower Data is ", borrowerData);

  const [loanContractAddress,setLoanContractAddress] = useState("0x0000")
  
  //Get lender address
  const {address:lenderAddress} = useAccount()

  //Get loanContract Address
  const {data: employmentLoanAddress} = useContractRead({
    addressOrName: '0x60Fbd177b7B4311ab36134C106A88f337e981Ca9',
    contractInterface: loanFactoryABI,
    functionName: 'idToLoan',
    args: borrowerData.loanId,
    onSuccess(data){
      setLoanContractAddress(data)
    }
  })

  console.log("Loan contract address is ", loanContractAddress);

  //Get DAI Token contract for lender to call approve()
  const { config: approveERC20Config } = usePrepareContractWrite({
    addressOrName: "0x88271d333C72e51516B67f5567c728E702b3eeE8",
    contractInterface: erc20ABI,
    functionName: 'approve',
    args:[loanContractAddress, lenderAddress ]
  })
  
  const {write:approveERC20, data, isSuccess} = useContractWrite(approveERC20Config)

  //Prepare Lend Function
  const { config: lendToBorrowerConfig } = usePrepareContractWrite({
    addressOrName: loanContractAddress,
    contractInterface: employmentLoanABI,
    functionName: 'lend'
  })

  const {write: lendToBorrower} = useContractWrite(lendToBorrowerConfig)


  //Link for etherscan
  const etherscanBorrowerAddress = "https://etherscan.io/address/" + borrowerData.borrower
  const etherscanContractAddress = "https://etherscan.io/address/" + loanContractAddress

  function lend(){
    approveERC20()
    lendToBorrower()
  }

 

  return (

    <div>
    {/* Header */}
    <div class="mx-auto rounded-md mb-8 p-8 w-10/12 mt-10 ">
        <div class="flex flex-col gap-8">

        {/* Title and Borrower */}
            <div class="flex justify-between">
                <h1 class="font-semibold text-2xl">Borrower Detail</h1>
                <button onClick={lend} class="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Lend to this Borrower</button>
            </div>

            {/* Account Detail */}
            <div class="flex items-center gap-5">
                <Jazzicon diameter={65} seed={jsNumberForAddress(String(borrowerData.borrower))} />
                <div class="flex flex-col">
                    <div class="flex gap-2 items-center">

                        <p class="text-xl font-medium">{borrowerData.borrower} </p>
                        <a target="_blank" href={etherscanBorrowerAddress}>
                            <Redirect width="1.5rem"/>
                        </a>

                    </div>
                </div>
            </div>

            {/* Loan Detail */}
            
            <div class="grid grid-rows-2 flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 w-4/12 border-grey-200 rounded-md">
                <div class="grid grid-cols-3 justify-between pb-2">
                    <div class="flex col-span-1 flex-col">
                        <p class="text-md text-gray-500">Loan Value</p>
                        <div class="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p class="text-2xl font-medium">{borrowerData.borrowAmount/1000000000000000000}</p>
                        </div>
                    </div>
                    <div class="flex col-span-1 flex-col">
                        <p class="text-sm text-gray-500">Loan Duration</p>
                        <p class="text-xl font-medium">{borrowerData.paybackMonths} Months</p>
                    </div>
                    <div class="flex col-span-1 flex-col ">
                        <p class="text-md text-gray-500 mr-5">APY</p>
                        <p class="text-2xl font-medium">{borrowerData.interestRate}%</p>

                    </div>
                </div>
               

                <div class="grid grid-cols-3 justify-around pt-2 pr-6">
                    <div class="flex flex-col col-span-1">
                        <p class="text-sm text-gray-500">Return Amount</p>
                        <div class="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p class="text-xl font-medium">{
                        borrowerData.borrowAmount/100000000000000000000+
                        ((((borrowerData.borrowAmount)*
                        (borrowerData.interestRate*(borrowerData.paybackMonths/12)))/100000000000000000000).toFixed(2))}</p>
                        </div>
                    </div>
             
                    <div class="flex flex-col col-span-1">
                        <p class="text-sm text-gray-500">Contract Address</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-xl font-medium">{shortenAddress(loanContractAddress)}</p>
                            <a target="_blank" href={etherscanContractAddress}>
                                <Redirect width="1.2rem"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Borrower Summary */}
            <div class="flex flex-col gap-2">

              <h1 class="font-medium text-xl">Borrower Summary</h1>

              <div class="flex flex-col  gap-3 shrink w-4/12 bg-[#F5F9FF] rounded-md p-5">
                  <div class="flex gap-10 justify-items-center items-center  ">
                      <div class="flex flex-col gap-2 self-center">
                          <h1 class="text-gray-500">Credit Score</h1>
                          <p class="text-lg">5</p>                            
                      </div>
                      <div class=" divide-x divide-solid divide-gray-900"></div>
                      <div class="flex flex-col gap-2">
                            <h1 class="text-gray-500">Loan History</h1> 
                            <p class="text-lg">100% Repayment</p> 
                      </div>
                      <div class="flex flex-col gap-2">
                          <h1 class="text-gray-500">Salary History</h1>  
                          <p class="text-lg">3 months</p>  
                      </div>
                  </div>
              </div>

            </div>
          

            {/* Loan History */}
            <div>
            <h1 class="font-medium text-xl">Loan History</h1>
            {/* py-5 pt-0 grid grid-cols-13 grid-flow-row justify-between text-xl items-center hover:opacity-70 hover:cursor-pointer */}
            {/* container py-5 grid grid-cols-13 justify-between text-xl text-stone-500 items-center border-2 border-black */}
            <div class="py-5 pt-2 text-stone-500 grid grid-cols-13 grid-flow-row justify-between text-xl items-center">
                <div class="col-span-3">Lender</div>
                <div class="col-span-2">Value</div>
                <div class="col-span-2">Maturity</div>
                <div class="col-span-2">Contract Address</div>
                <div class="col-span-2">Start Date</div>
                <div class="col-span-1">APR</div>
                <div class="col-span-1">Status</div>
            </div>
            <div>
        {dataSet.map((borrower, index) => {
          return <LoanHistorySection index={index} data={borrower} />;
        })}
      </div>

            </div>
        </div>
    </div>

    </div>
    

  );
}
