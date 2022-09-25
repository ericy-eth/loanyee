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
// import employmentLoanABI from "../data/contractABI/EmploymentLoan.json"
import { writeContract } from '@wagmi/core';
import erc20ABI from "../data/contractABI/erc20TokenABI.json"


//Helper Functions
const employmentLoanABI = [
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
        "internalType": "int256",
        "name": "_paybackMonths",
        "type": "int256"
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
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "CFA_ID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "_superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementCreated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "_superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementTerminated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "_superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementUpdated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementCreated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementTerminated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementUpdated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "borrowAmount",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "borrowToken",
    "outputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "borrower",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cfaV1",
    "outputs": [
      {
        "internalType": "contract ISuperfluid",
        "name": "host",
        "type": "address"
      },
      {
        "internalType": "contract IConstantFlowAgreementV1",
        "name": "cfa",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "closeCompletedLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountForPayoff",
        "type": "uint256"
      }
    ],
    "name": "closeOpenLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "employer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPaymentFlowRate",
    "outputs": [
      {
        "internalType": "int96",
        "name": "paymentFlowRate",
        "type": "int96"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalAmountRemaining",
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
    "inputs": [],
    "name": "host",
    "outputs": [
      {
        "internalType": "contract ISuperfluid",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "interestRate",
    "outputs": [
      {
        "internalType": "int8",
        "name": "",
        "type": "int8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lender",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loanOpen",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loanStartTime",
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
    "inputs": [],
    "name": "paybackMonths",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


export default function BorrowerDetail() {

  function shortenAddress(str){
    return str.substring(0, 5) + "..." + str.substring(str.length - 3);
  };

  //Router for passing data between pages
  const router = useRouter();
  const borrowerData = router.query;

  
  const { user, setUser } = useContext(UserContext);

  const [loanContractAddress,setLoanContractAddress] = useState("0x0000")
  
  //Get lender address
  const {address:lenderAddress} = useAccount()

  //Get loanContract Address
  const {data: employmentLoanAddress} = useContractRead({
    addressOrName: '0xFB26b9144f13e7D2485C4df2cCbb977660DC01fc',
    contractInterface: loanFactoryABI,
    functionName: 'idToLoan',
    args: borrowerData.loanId,
    onSuccess(data){
      setLoanContractAddress(data)
    }
  })

  
  //get borrow amount
  const {data: borrowAmount} = useContractRead({
    addressOrName: loanContractAddress,
    contractInterface: loanFactoryABI,
    functionName: 'borrowAmount',
    onSuccess(data){
      console.log("Borrow amount is ", data);
    }
  })


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
    addressOrName: "0x224A13dc8035706B594297c561806Bf191477977",
    contractInterface: employmentLoanABI,
    functionName: 'lend',
    args:[]
  })

  const {write: lendToBorrower} = useContractWrite(lendToBorrowerConfig)


  //Link for etherscan
  const etherscanBorrowerAddress = "https://etherscan.io/address/" + borrowerData.borrower
  const etherscanContractAddress = "https://etherscan.io/address/" + loanContractAddress

  function approve(){
    approveERC20()
  }
  function lend(){
    lendToBorrower()
  }

 

  return (

    <div>
    {/* Header */}
    <div className="mx-auto rounded-md mb-8 p-8 w-10/12 mt-10 ">
        <div className="flex flex-col gap-8">

        {/* Title and Borrower */}
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl">Borrower Detail</h1>
                <button onClick={approve} className="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Approve</button>
                <button onClick={lend} className="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Lend to this Borrower</button>

            </div>

            {/* Account Detail */}
            <div className="flex items-center gap-5">
                <Jazzicon diameter={65} seed={jsNumberForAddress(String(borrowerData.borrower))} />
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">

                        <p className="text-xl font-medium">{borrowerData.borrower} </p>
                        <a target="_blank" rel="noreferrer" href={etherscanBorrowerAddress}>
                            <Redirect width="1.5rem"/>
                        </a>

                    </div>
                </div>
            </div>

            {/* Loan Detail */}
            
            <div className="grid grid-rows-2 flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 w-4/12 border-grey-200 rounded-md">
                <div className="grid grid-cols-3 justify-between pb-2">
                    <div className="flex col-span-1 flex-col">
                        <p className="text-md text-gray-500">Loan Value</p>
                        <div className="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p className="text-2xl font-medium">{borrowerData.borrowAmount/1000000000000000000}</p>
                        </div>
                    </div>
                    <div className="flex col-span-1 flex-col">
                        <p className="text-sm text-gray-500">Loan Duration</p>
                        <p className="text-xl font-medium">{borrowerData.paybackMonths} Months</p>
                    </div>
                    <div className="flex col-span-1 flex-col ">
                        <p className="text-md text-gray-500 mr-5">APY</p>
                        <p className="text-2xl font-medium">{borrowerData.interestRate}%</p>

                    </div>
                </div>
               

                <div className="grid grid-cols-3 justify-around pt-2 pr-6">
                    <div className="flex flex-col col-span-1">
                        <p className="text-sm text-gray-500">Return Amount</p>
                        <div className="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p className="text-xl font-medium">{
                        borrowerData.borrowAmount/100000000000000000000+
                        ((((borrowerData.borrowAmount)*
                        (borrowerData.interestRate*(borrowerData.paybackMonths/12)))/100000000000000000000).toFixed(2))}</p>
                        </div>
                    </div>
             
                    <div className="flex flex-col col-span-1">
                        <p className="text-sm text-gray-500">Contract Address</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-xl font-medium">{shortenAddress(loanContractAddress)}</p>
                            <a target="_blank" rel="noreferrer" href={etherscanContractAddress}>
                                <Redirect width="1.2rem"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Borrower Summary */}
            <div className="flex flex-col gap-2">

              <h1 className="font-medium text-xl">Borrower Summary</h1>

              <div className="flex flex-col  gap-3 shrink w-4/12 bg-[#F5F9FF] rounded-md p-5">
                  <div className="flex gap-10 justify-items-center items-center  ">
                      <div className="flex flex-col gap-2 self-center">
                          <h1 className="text-gray-500">Credit Score</h1>
                          <p className="text-lg">5</p>                            
                      </div>
                      <div className=" divide-x divide-solid divide-gray-900"></div>
                      <div className="flex flex-col gap-2">
                            <h1 className="text-gray-500">Loan History</h1> 
                            <p className="text-lg">100% Repayment</p> 
                      </div>
                      <div className="flex flex-col gap-2">
                          <h1 className="text-gray-500">Salary History</h1>  
                          <p className="text-lg">3 months</p>  
                      </div>
                  </div>
              </div>

            </div>
          

            {/* Loan History */}
            <div>
            <h1 className="font-medium text-xl">Loan History</h1>
            {/* py-5 pt-0 grid grid-cols-13 grid-flow-row justify-between text-xl items-center hover:opacity-70 hover:cursor-pointer */}
            {/* container py-5 grid grid-cols-13 justify-between text-xl text-stone-500 items-center border-2 border-black */}
            <div className="py-5 pt-2 text-stone-500 grid grid-cols-13 grid-flow-row justify-between text-xl items-center">
                <div className="col-span-3">Lender</div>
                <div className="col-span-2">Value</div>
                <div className="col-span-2">Maturity</div>
                <div className="col-span-2">Contract Address</div>
                <div className="col-span-2">Start Date</div>
                <div className="col-span-1">APR</div>
                <div className="col-span-1">Status</div>
            </div>
            <div>
        {dataSet.map((borrower, index) => {
          return <LoanHistorySection key={4} index={index} data={borrower} />;
        })}
      </div>

            </div>
        </div>
    </div>

    </div>
    

  );
}