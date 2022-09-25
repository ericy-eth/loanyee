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
    <div className="mx-auto rounded-md mb-8 p-8 w-10/12 mt-10 ">
        <div className="flex flex-col gap-8">

        {/* Title and Borrower */}
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl">Borrower Detail</h1>
                <button className="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Lend to this Borrower</button>
            </div>

            {/* Account Detail */}
            <div className="flex items-center gap-5">
                <Jazzicon diameter={65} seed={jsNumberForAddress(String(borrowerData.borrower))} />
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">

                        <p className="text-xl font-medium">{borrowerData.borrower} </p>
                        <a target="_blank" rel="noreferrer" href={etherscanAddress}>
                            <Redirect width="1.5rem"/>
                        </a>

                    </div>
                </div>
            </div>

            {/* Loan Detail */}
            
            <div className="flex flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 w-4/12 border-grey-200 rounded-md">
                <div className="flex justify-between pb-2">
                    <div className="flex flex-col">
                        <p className="text-md text-gray-500">Loan Value</p>
                        <div className="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p className="text-2xl font-medium">{borrowerData.borrowAmount/1000000000000000000}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-500">Loan Duration</p>
                        <p className="text-xl font-medium">{borrowerData.paybackMonths} Months</p>
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-md text-gray-500 mr-5">APY</p>
                        <p className="text-2xl font-medium">{borrowerData.interestRate}%</p>

                    </div>
                </div>
               

                <div className="flex gap-36 pt-2 pr-6">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-500">Return Amount</p>
                        <div className="flex gap-2" >
                        <DAI width={"2rem"}></DAI> <p className="text-xl font-medium">{
                        borrowerData.borrowAmount/100000000000000000000+
                        ((((borrowerData.borrowAmount)*
                        (borrowerData.interestRate*(borrowerData.paybackMonths/12)))/100000000000000000000).toFixed(2))}</p>
                        </div>
                    </div>
             
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-500">Contract Address</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-xl font-medium">0x723...459</p>
                            <a target="_blank" rel="noreferrer" href='https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'>
                                <Redirect width="1.2rem"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Borrower Summary */}

            <div className="flex flex-col gap-3">
                <h1 className="font-medium text-xl">Borrower Summary</h1>
                <div className="flex gap-10 w-5/12 justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-gray-500">Credit Score</h1>
                        <p className="text-xl">5</p>                            
                    </div>
                    <div className="flex flex-col gap-2">
                          <h1 className="text-gray-500">Loan History</h1> 
                          <p className="text-xl">100% Repayment</p> 
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-gray-500">Salary History</h1>  
                        <p className="text-xl">3 months</p>  
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
