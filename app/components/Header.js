import React from 'react';
import Link from "next/link";
import Image from "next/image";
import loanyeeLogo from '../public/image/LoanyeeLogo.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';

//wallet connect
import { useAccount } from 'wagmi';

//React Hooks
import { useEffect, useState } from 'react';

const Header = () =>{

    const {isConnected} = useAccount()


    const [walletConnected, setWalletConnected] = useState()

    useEffect(()=>{
        

        setWalletConnected(isConnected);
    },[])
    

    return(
        <header className="flex justify-between align-middle py-6 px-8 ">
            <Link href="/">
            <div className="items-center" >
                <Image src={loanyeeLogo} width={200} height={40}></Image>
            </div>
            </Link>

            <div className="flex flex-row gap-3 items-center">
                {walletConnected &&
                <Link href="/borrow">
                <a className="text-lg hover:opacity-60 m-0 border-black border-2 text-black bg-white py-2 px-5 rounded-full">
                Become a Borrower
                </a>
            </Link>
                }


            <ConnectButton></ConnectButton>
            
            </div>
        </header>
    )
}

export default Header;