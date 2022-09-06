import Link from "next/link"
import Image from "next/image"
import banner from "../public/image/banner.png"
import BorrowerProfile from "../components/borrowerProfile"
export default function Home() {
  const profile = {
 
    borrowerAddress:"0x53..123",
    value:"100",
    maturity:"30 days",
    creditScore:"4",
    salaryHistory:"5 months",
    APR:"15%",
    status:"Active"
  }

  const dataSet = [profile, profile, profile]
  return (
   <div class="bg-white">
      <header class="flex justify-between align-middle py-4 px-8 border-b-2 border-grey-200">

        <div class="text-4xl font-bold py-2 px-5"> 
          🌀 Salary Based Loan
        </div>

        <div class="flex flex-row gap-3 items-center">

            <Link href="/borrow">
              <a class="text-md hover:opacity-60 m-0 border-black border-2 text-black bg-white py-1.5 px-5 rounded-full">
                Become a Borrower
              </a>
            </Link>

          
            <Link href="/">
            <a class="text-md hover:opacity-80 m-0 bg-stone-900 text-white py-2 px-5 rounded-full">
                Sign In with Ethereum
              </a>
            </Link>
        
        </div>

       
     
      </header>


<div class="container mx-auto mt-10">
<Image class="w-12" src={banner}></Image>
</div>

      <div class="container mx-auto  mt-10 ">
        <div class="py-5 grid grid-cols-13 justify-between text-xl text-stone-500 items-center">
          <div class="col-span-2">Borrower</div>
          <div class="col-span-2">Value</div>
          <div class="col-span-2">Maturity</div>
          <div class="col-span-2">Credit Score</div>
          <div class="col-span-2">Salary History</div>
          <div class="col-span-2">APR</div>
          <div class="col-span-1">Status</div>
        </div>

        {dataSet.map((borrower, index)=>{
          return <BorrowerProfile index={index} data={borrower}/>
        }

        )}


      </div>

   </div>
  )
}
