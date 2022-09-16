import Jazzicon, { jsNumberForAddress } from 'react-jazzicon' //Randomly generated profiles
import Redirect from '../components/utilityLogos/redirect';

import Link from 'next/link';

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

import dataSet from '../data/loanHistoryList.js';
import LoanHistorySection from '../components/loanDetail/loanHistorySection';

import USDC from '../components/cryptologos/usdc';

export default function BorrowerDetail() {
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

          <a
            onClick={connectWallet}
            class="text-md hover:opacity-80  m-0 bg-stone-900 text-white w-32 py-2 px-5 rounded-full text-center"
          >
            {!isWalletConnected ? <>Sign In </> : <>Connected!</>}
          </a>
        </div>
      </header>
    <div class="mx-auto rounded-md mb-8 p-8 w-10/12 mt-10 ">
        <div class="flex flex-col gap-8">

        {/* Title and Borrower */}
            <div class="flex justify-between">
                <h1 class="font-semibold text-2xl">Borrower Detail</h1>
                <button class="text-md hover:opacity-80  m-0 bg-stone-900 text-white py-2 px-5 rounded-full text-center">Lend to this Borrower</button>
            </div>

            {/* Account Detail */}
            <div class="flex items-center gap-5">
                <Jazzicon diameter={65} seed={jsNumberForAddress("0xCD458d7F11023556cC9058F729831a038Cb8Df9c")} />
                <div class="flex flex-col">
                    <div class="flex gap-2 items-center">

                        <p class="text-xl font-medium">0xCD458d7F11...31a038Cb8Df9c </p>
                        <a target="_blank" href='https://etherscan.io/address/0xCD458d7F11023556cC9058F729831a038Cb8Df9c'>
                            <Redirect width="1.5rem"/>
                        </a>

                    </div>
                </div>
            </div>

            {/* Loan Detail */}
            
            <div class="flex flex-col border-2 divide-y divide-solid divide-gray-200 px-5 py-3 w-5/12 border-grey-200 rounded-md">
                <div class="flex gap-10 pb-2">
                    <div class="flex flex-col">
                        <p class="text-md text-gray-500">Loan Value</p>
                        <div class="flex gap-2" >
                        <USDC width={"1.5rem"}></USDC> <p class="text-2xl font-medium">10,000</p>
                        </div>
                    </div>
                    <div class="flex flex-col ">
                        <p class="text-md text-gray-500">APY</p>
                        <p class="text-2xl font-medium">20%</p>

                    </div>
                </div>
               

                <div class="flex justify-between pt-2 pr-6">
                    <div class="flex flex-col">
                        <p class="text-sm text-gray-500">Return Amount</p>
                        <div class="flex gap-2" >
                        <USDC width={"1.5rem"}></USDC> <p class="text-xl font-medium">12,000</p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-sm text-gray-500">Loan Duration</p>
                        <p class="text-xl font-medium">90 Days</p>
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
            <div class="container py-5 grid grid-cols-13 justify-between text-xl text-stone-500 items-center">
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
