import rocifi from "../../public/image/rocifi.jpeg"
import Image from "next/image"

export default function AccountHistory(){
    return(
        <div class="flex flex-col mt-8  justify-center text-2xl">
            <section class="flex flex-col gap-2">
            <h1 class="flex font-bold justify-center">Prove your Credit Score</h1>
            <p class="flex justify-center">Recieve your credit score on RociFi by minting NFC NFT</p>
            </section>

            <a target="_blank" href="https://roci.fi/app/markets?startnfcs=true">
            <Image src={rocifi}></Image>
            </a>
            
            
        </div>
    )
    }