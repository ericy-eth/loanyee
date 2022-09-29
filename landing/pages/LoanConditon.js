import Link from "next/link"
import Image from "next/image"
import LOGO from '../public/image/LogoTwo.png'
import BorrowerProfile from "../components/borrowerProfile"
import Card from '@mui/material/Card';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ethers } from "ethers";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";

export default function Home() {
  const { user, setUser } = useContext(UserContext)

  const [isWalletConnected, setWalletConnected] = useState()
  const [age, setAge] = useState('');

  const handleChange = () => {
    // setAge(event.target.value);
  };
  useEffect(() => {
    checkIfWalletConnected()
  }, [])
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

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setWalletConnected(true)
        setUser({ account: account })

      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    const { ethereum } = window

    if (!ethereum) {
      console.log("No metamask detected");
      return
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0]
    setUser({ account: account })
    setWalletConnected(true)


  }


  const profile1 = {

    borrowerAddress: "0x53203942123",
    currency: "USDC",
    value: "25,000",
    maturity: "30 days",
    creditScore: "4",
    salaryHistory: "5 months",
    APR: "15%",
    status: "Active"
  }

  const profile2 = {

    borrowerAddress: "0x35759232432",
    currency: "ETH",
    value: "1.5",
    maturity: "90 days",
    creditScore: "2",
    salaryHistory: "3 months",
    APR: "7%",
    status: "Active"
  }

  const profile3 = {
    borrowerAddress: "0x982032948824",
    currency: "USDC",
    value: "50,000",
    maturity: "30 days",
    creditScore: "2",
    salaryHistory: "9 months",
    APR: "10%",
    status: "Inactive"
  }

  const profile4 = {
    borrowerAddress: "0x9189382013124",
    currency: "USDC",
    value: "120,000",
    maturity: "30 days",
    creditScore: "5",
    salaryHistory: "9 months",
    APR: "12%",
    status: "Active"
  }

  const profile5 = {
    borrowerAddress: "0x84628163732822",
    currency: "ETH",
    value: "2.25",
    maturity: "90 days",
    creditScore: "3",
    salaryHistory: "1 year",
    APR: "5%",
    status: "Active"
  }

  const dataSet = [profile1, profile2, profile3, profile1, profile4, profile5, profile1, profile2, profile4, profile4, profile2, profile3, profile5, profile2, profile5, profile1, profile2, profile3, profile1, profile2, profile3]
  return (
    <div class="container-fluid">
      {/* Header */}
      <div className="img_section"> 
        <header class="img-fluid flex justify-between align-middle py-4 px-8 border-b-1  border-grey-200"  >
          <div class="col text-5xl ml-4 w-100 font-bold py-2 px-5 text-black ">
            <Image src={LOGO} width={220} height={40}></Image>
          </div>
          <div class="col mr-5 flex flex-row gap-3 items-center">
            <Link href="/borrow">
              <a className="btnOne">
                {/* Become a Borrower */}
                {!isWalletConnected ? <>Become a borrower</> : <>Connected!</>}
              </a>
            </Link>
            <a onClick={connectWallet} className="btnTWo">
              {!isWalletConnected ? <>Connect Wallet</> : <>Connected!</>}
            </a>
          </div>
        </header>
        {/* Banner */}
        <div class="row container mt-12 mx-auto">
          <div class="col text-7xl py-3 mt-10 px-5 text-black text-center"><div className="font">Borrow uncollateralized loan</div></div>
          <div class=" col text-7xl text-black mb-5 ml-11 mb-9 text-center mr-10"><div className="font">with your on-chain income history</div></div>
        </div>
        {/* Categories */}
        <div className="CardDiv">
          <Card className="card">
            <div>
              <div class="container mt-10 mx-auto py-5  justify-between text-xl text-stone-500 items-center">
                {/* <FormControl > */}
                <TextField className="TextFieldOne" id="input-with-icon-textfield"   variant="standard"
           
               
                  InputProps={{
                    startAdornment: <InputAdornment position="start" ><SearchIcon /></InputAdornment>, placeholder: "Search by wallet address,ENS name ",
                    disableUnderline: true,
                  }} />
                <TextField
                  className="TextFieldTwo"
                  label="Token"
                  id="input-with-icon-textfield"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><ExpandMoreIcon /></InputAdornment>,
                  }}
                />
                <TextField className="TextFieldThree"
                  id="input-with-icon-textfield" label="sort"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="start"><SortIcon /></InputAdornment>,
                  }}
                />
              </div>
            </div>
            <div class="overflow">
            <div class="container font-bold ml-1 mt-5 mx-11 px-4 py-5 grid grid-cols-12 justify-between text-lg text-stone-500 items-center">
              <div class="col-span-2 ml-5 brwsr">Borrower</div>
              <div class="col-span- 2 ml-0 vlue ">Value</div>
              <div class="col-span-2  ml-24  mturty">Maturity</div>
              <div class="col-span-2 ml-12 crdt">Credit Score</div>
              <div class="col-span-2 ml-12 slry">Salary History</div>
              <div class="col-span-2 ml-12 last ap">APR</div>
              <div class="col-span-1 stts">Status</div>
            </div>
            <hr />
            {/* Borrowers List */}
            <div className="cardItem" class="container mx-auto"> 
              {dataSet.map((borrower, index) => {
                return (<>
                  <Box className="BoxHeight">
                    <BorrowerProfile index={index} data={borrower} class="cardItem"/>
                  </Box>
                </>
                )
              }
              )}
            </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}



// THis is also 
<div className="CardDiv">
<div sx={{ width: '100%' }}>
  <Stepper nonLinear activeStep={activeStep}>
    {steps.map((label, index) => (
      <Step key={label} completed={completed[index]}>
        <StepButton color="inherit" onClick={handleStep(index)}>
          {label}
        </StepButton>
      </Step>
    ))}
  </Stepper>
  <div>
    {allStepsCompleted() ? (
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
      </React.Fragment>
    ) : (
      <React.Fragment>
      </React.Fragment>
    )}
  </div>
</div>
<div class="h-auto bg-fuchsia-300 ml-9 font-Inter">
  <div class="font-medium text-2xl mt-16 font-Inter">Set up loan conditions</div>
  <div class="font-medium text-xl mt-4 text-slate-700 f">Salary history</div>
  <div class="font-medium text-sm mt-2 text-slate-700 font-Inter">Employer address</div>
  <div class="flex mt-4">
    <div>
      <input type="text" placeholder="0xor...238m" class="bg-red-500 w-96 h-10 rounded"></input>
    </div>
    <div>
      <button type="button" class="ml-4 border-solid border-2 border-black p-1 px-6 mt-1 rounded-full">Search</button>
    </div>
  </div>
  <div class="flex mt-3">
    <p class="text-sm font-medium"> Duration : </p>
    <p class="text-sm font-medium ml-1"> 3month</p>
  </div>
</div>
</div>