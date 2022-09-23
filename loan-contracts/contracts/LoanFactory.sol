// SPDX-License-Identifier: MIT 
pragma solidity >=0.8.0;  
import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";  
import {EmploymentLoan} from "./EmploymentLoan.sol";  

//Tableland 
import "@tableland/evm/contracts/ITablelandTables.sol";  
//Helper functions 
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol"; 
import "@openzeppelin/contracts/utils/Strings.sol";    

contract LoanFactory {      
    // Events     
    event loanCreated(uint256 loanId, int256 borrowAmount, int8 interestRate, int8 paybackMonths, address employer, address borrower, ISuperToken borrowToken);    
    
    /// @notice counter which is iterated +1 for each new loan created.     
    /// @dev Note that the value begins at 0 here, but the first one will start at one.    
    uint256 public loanId;      

    // @notice tableland registry     
    ITablelandTables private _tableland;     
    uint256 private tableId;      

    /// @notice mapping of loanId to the loan contract    
    mapping(uint256 => EmploymentLoan) public idToLoan;   

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
        idToLoan[loanId] = newLoan;        
        employmentLoanOwners[msg.sender] = loanId; 
        return loanId;     
    }  
}