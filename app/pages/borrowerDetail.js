import Jazzicon, { jsNumberForAddress } from 'react-jazzicon' //Randomly generated profiles
import Redirect from '../components/utilityLogos/redirect';

import Link from 'next/link';

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";
import { useRouter } from 'next/router'


import dataSet from '../data/loanHistoryList.js';
import LoanHistorySection from '../components/loanDetail/loanHistorySection';

import USDC from '../components/cryptologos/usdc';
import DAI from '../components/cryptologos/dai';

export default function BorrowerDetail() {


  //Router for passing data between pages
  const router = useRouter();
const borrowerData = router.query;
console.log("borrow data is ", borrowerData);

  //Link for etherscan
  const etherscanAddress = "https://etherscan.io/address/" + borrowerData.borrower
  

    const { user, setUser } = useContext(UserContext);

  const [isWalletConnected, setWalletConnected] = useState();

  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  async function checkIfWalletConnected() {
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
      ensName = await provider.resolveName("vitalik.eth");

      console.log("ENS name is " + ensName);

      if (accounts.length !== 0) {
        const account = accounts[0];

        console.log("Found an authorized account:", account);
        setWalletConnected(true);
        setUser({ account: account });
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No metamask detected");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    setUser({ account: account });
    setWalletConnected(true);
  }
  return (

    <div>
    {/* Header */}
    <div class="mx-auto rounded-md mb-8 p-8 w-10/12 mt-10 ">
        <div class="flex flex-col gap-8">

        {/* Title and Borrower */}
            <div class="flex justify-between">
                <h1 class="font-semibold text-2xl">Borrower Detail</h1>
                <button class="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Lend to this Borrower</button>
            </div>

            {/* Account Detail */}
            <div class="flex items-center gap-5">
                <Jazzicon diameter={65} seed={jsNumberForAddress(String(borrowerData.borrower))} />
                <div class="flex flex-col">
                    <div class="flex gap-2 items-center">

                        <p class="text-xl font-medium">{borrowerData.borrower} </p>
                        <a target="_blank" href={etherscanAddress}>
                            <Redirect width="1.5rem"/>
                        </a>

                    </div>
                </div>
            </div>

            {/* Loan Detail */}
            
            <div class="flex flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 w-4/12 border-grey-200 rounded-md">
                <div class="flex justify-between pb-2">
                    <div class="flex flex-col">
                        <p class="text-md text-gray-500">Loan Value</p>
                        <div class="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p class="text-2xl font-medium">{borrowerData.borrowAmount%18}</p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-sm text-gray-500">Loan Duration</p>
                        <p class="text-xl font-medium">{borrowerData.paybackMonths} Months</p>
                    </div>
                    <div class="flex flex-col ">
                        <p class="text-md text-gray-500 mr-5">APY</p>
                        <p class="text-2xl font-medium">{borrowerData.interestRate}%</p>

                    </div>
                </div>
               

                <div class="flex gap-36 pt-2 pr-6">
                    <div class="flex flex-col">
                        <p class="text-sm text-gray-500">Return Amount</p>
                        <div class="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p class="text-xl font-medium">{(borrowerData.borrowAmount*(borrowerData.interestRate/borrowerData.paybackMonths))%18}</p>
                        </div>
                    </div>
             
                    <div class="flex flex-col">
                        <p class="text-sm text-gray-500">Contract Address</p>
                        <div class="flex gap-2 items-center">
                            <p class="text-xl font-medium">0x723...459</p>
                            <a target="_blank" href='https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'>
                                <Redirect width="1.2rem"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Borrower Summary */}

            <div class="flex flex-col gap-3">
                <h1 class="font-medium text-xl">Borrower Summary</h1>
                <div class="flex gap-10 w-5/12 justify-between">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-gray-500">Credit Score</h1>
                        <p class="text-xl">5</p>                            
                    </div>
                    <div class="flex flex-col gap-2">
                          <h1 class="text-gray-500">Loan History</h1> 
                          <p class="text-xl">100% Repayment</p> 
                    </div>
                    <div class="flex flex-col gap-2">
                        <h1 class="text-gray-500">Salary History</h1>  
                        <p class="text-xl">3 months</p>  
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
