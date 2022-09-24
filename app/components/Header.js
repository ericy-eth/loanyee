import React from 'react';
import Link from "next/link";
import Image from "next/image";
import loanyeeLogo from '../public/image/LoanyeeLogo.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () =>{
    return(
        <header class="flex justify-between align-middle py-6 px-8 border-b-2 border-grey-200">
            <Link href="/">
            <div className="items-center" >
                <Image src={loanyeeLogo} width={200} height={40}></Image>
            </div>
            </Link>

            <div class="flex flex-row gap-3 items-center">
            <Link href="/borrow">
                <a class="text-lg hover:opacity-60 m-0 border-black border-2 text-black bg-white py-2 px-5 rounded-full">
                Become a Borrower
                </a>
            </Link>

            {/* <a
                onClick={connectWallet}
                class="text-lg hover:opacity-80  m-0 bg-stone-900 text-white w-48 py-2 px-5 rounded-full text-center"
            >
                {!isWalletConnected ? <>Connect Wallet </> : <>Connected!</>}
            </a> */}
            <ConnectButton />
            </div>
        </header>
    )
}

export default Header;