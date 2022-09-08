import Link from "next/link"
import Image from "next/image"
import banner from "../public/image/banner.png"
import BorrowerProfile from "../components/borrowerProfile"
export default function Home() {
  const profile1 = {
 
    borrowerAddress:"0x53..123",
    currency:"USDC",
    value:"25,000",
    maturity:"30 days",
    creditScore:"4",
    salaryHistory:"5 months",
    APR:"15%",
    status:"Active"
  }

  const profile2 = {
 
    borrowerAddress:"0x35..432",
    currency:"ETH",
    value:"1.5",
    maturity:"90 days",
    creditScore:"2",
    salaryHistory:"3 months",
    APR:"7%",
    status:"Active"
  }

  const profile3 = {
    borrowerAddress:"0x98..824",
    currency:"USDC",
    value:"50,000",
    maturity:"30 days",
    creditScore:"2",
    salaryHistory:"9 months",
    APR:"10%",
    status:"Inactive"
  }

  const dataSet = [profile1, profile2, profile3,profile1, profile2, profile3,profile1, profile2, profile3,profile1, profile2, profile3,profile1, profile2, profile3,profile1, profile2, profile3,profile1, profile2, profile3]
  return (
   <div class="bg-white">
    {/* Header */}
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

          
            <Link href="/signup">
            <a class="text-md hover:opacity-80 m-0 bg-stone-900 text-white py-2 px-5 rounded-full">
                Sign In with Ethereum
              </a>
            </Link>
        
        </div>

       
     
      </header>

    {/* Banner */}
      <div class="container mt-12 mx-auto">
      <Image class="w-12" src={banner}></Image>
      </div>

      {/* Sorting */}
      {/* <div class="container mt-12 mx-auto grid grid-cols-12">
      
         <div class="bg-neutral-100 rounded-full px-5 py-1">
          <input style={{outline:"none"}} ></input>
         </div>
      </div> */}

      {/* Categories */}
      <div class="container mt-10 mx-auto py-5 grid grid-cols-13 justify-between text-xl text-stone-500 items-center">
        <div class="col-span-2">Borrower</div>
        <div class="col-span-2">Value</div>
        <div class="col-span-2">Maturity</div>
        <div class="col-span-2">Credit Score</div>
        <div class="col-span-2">Salary History</div>
        <div class="col-span-2">APR</div>
        <div class="col-span-1">Status</div>
      </div>

    {/* Borrowers List */}
      <div style={{maxHeight: "67rem"}} class="container mx-auto overflow-auto ">
      

        {dataSet.map((borrower, index)=>{
          return <BorrowerProfile index={index} data={borrower}/>
        }

        )}


      </div>

   </div>
  )
}
