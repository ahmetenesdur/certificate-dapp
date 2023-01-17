import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CertificationCreated,
  CoffeeBought
} from "../generated/Certificate/Certificate"

export function createCertificationCreatedEvent(
  id: BigInt,
  hash: string,
  message: string,
  category: string,
  author: Address,
  holder: Address,
  timestamp: BigInt
): CertificationCreated {
  let certificationCreatedEvent = changetype<CertificationCreated>(
    newMockEvent()
  )

  certificationCreatedEvent.parameters = new Array()

  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam("holder", ethereum.Value.fromAddress(holder))
  )
  certificationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return certificationCreatedEvent
}

export function createCoffeeBoughtEvent(
  id: BigInt,
  buyer: Address,
  holder: Address,
  message: string,
  timestamp: BigInt
): CoffeeBought {
  let coffeeBoughtEvent = changetype<CoffeeBought>(newMockEvent())

  coffeeBoughtEvent.parameters = new Array()

  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("holder", ethereum.Value.fromAddress(holder))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return coffeeBoughtEvent
}
