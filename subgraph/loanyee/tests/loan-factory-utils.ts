import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { loanCreated } from "../generated/LoanFactory/LoanFactory"

export function createloanCreatedEvent(
  borrowAmount: BigInt,
  interestRate: i32,
  paybackMonths: i32,
  employer: Address,
  borrower: Address,
  borrowToken: Address
): loanCreated {
  let loanCreatedEvent = changetype<loanCreated>(newMockEvent())

  loanCreatedEvent.parameters = new Array()

  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "borrowAmount",
      ethereum.Value.fromSignedBigInt(borrowAmount)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "interestRate",
      ethereum.Value.fromI32(interestRate)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "paybackMonths",
      ethereum.Value.fromI32(paybackMonths)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("employer", ethereum.Value.fromAddress(employer))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "borrowToken",
      ethereum.Value.fromAddress(borrowToken)
    )
  )

  return loanCreatedEvent
}
