// SPDX-License-Identifier: MIT 
pragma solidity >=0.8.0;  
import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";  

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

//Tableland 
import "@tableland/evm/contracts/ITablelandTables.sol";  
//Helper functions 
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol"; 
import "@openzeppelin/contracts/utils/Strings.sol"; 

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract employmentEPNS is SuperAppBase{
    /// @notice Total amount borrowed.
    int256 public immutable borrowAmount;

    /// @notice Interest rate, in whole number. I.e. 8% interest rate would be passed as '8'
    int8 public immutable interestRate;

    /// @notice Number of months the loan will be paid back in. I.e. 2 years = '24'
    int256 public immutable paybackMonths;

    /// @notice Address of employer - must be allow-listed for this example
    address public immutable employer;

    /// @notice Borrower address.
    address public immutable borrower;

    /// @notice Superfluid Host.
    ISuperfluid public immutable host;

    /// @notice Token being borrowed.
    ISuperToken public immutable borrowToken;

    /// @notice Lender address.
    address public lender;

    /// @notice boolean flag to track whether or not the loan is open
    bool public loanOpen;

    /// @notice Timestamp of the loan start time.
    uint256 public loanStartTime;



     constructor(
        int256 _borrowAmount, // amount to be borrowed
        int8 _interestRate, // annual interest rate, in whole number - i.e. 8% would be passed as 8
        int256 _paybackMonths, // total payback months
        address _employer, // allow-listed employer address
        address _borrower, // borrower address
        ISuperToken _borrowToken, // super token to be used in borrowing
        ISuperfluid _host // address of SF host
    ) {
        borrowAmount = _borrowAmount;
        interestRate = _interestRate;
        paybackMonths = _paybackMonths;
        employer = _employer;
        borrower = _borrower;
        borrowToken = _borrowToken;
        host = _host;
        loanOpen = false;
    }

}


contract factoryEPNS {      
    // Events     
    event loanCreated(uint256 loanId, int256 borrowAmount, int8 interestRate, int8 paybackMonths, address employer, address borrower, ISuperToken borrowToken);    
    
    /// @notice counter which is iterated +1 for each new loan created.     
    /// @dev Note that the value begins at 0 here, but the first one will start at one.    
    uint256 public loanId;      

    // @notice tableland registry     
    ITablelandTables private _tableland;     
    uint256 private tableId;      

    /// @notice mapping of loanId to the loan contract    

    /// @notice mapping of loan owner (i.e. the msg.sender on the call) to the loan Id    
    mapping(address => uint256) public employmentLoanOwners;  

    //Initialize Tableland Registry     
    constructor(address registry){          
        _tableland = ITablelandTables(registry);         
        tableId = _tableland.createTable(address(this), string.concat(
        "CREATE TABLE loan_5",
        " (loanId int)"         
        ));     
    }      

    /// @notice Creates new loan contract.    
    /// @param _borrowAmount Amount to borrow.  
    /// @param _interestRate Interest rate.   
    /// @param _paybackMonths Number of months for repayment.
    /// @param _employer Employer address. 
    /// @param _borrower Borrower address.   
    /// @param _borrowToken Token to borrow. 
    /// @param _host Superfluid host.
    /// @return Loan ID.
    function createNewLoan(         
        int256 _borrowAmount,
        int8 _interestRate, 
        int8 _paybackMonths,
        address _employer,
        address _borrower, 
        ISuperToken _borrowToken,  
        ISuperfluid _host)
        external returns (uint256) {     

        EmploymentLoan newLoan = new EmploymentLoan(_borrowAmount,  _interestRate,   _paybackMonths,  _employer,  _borrower,  _borrowToken, _host);    

        loanId++;    
            
        // Insert the loan into tableland      
        _tableland.runSQL(address(this), 
        tableId, 
        string.concat("INSERT INTO loan_5_",Strings.toString(tableId),
            " VALUES (",Strings.toString(loanId),")"));  

        //Emit the event for the subgraph     
        emit loanCreated(loanId, _borrowAmount, _interestRate, _paybackMonths, _employer, _borrower, _borrowToken);        
        return loanId;     
    }  
}