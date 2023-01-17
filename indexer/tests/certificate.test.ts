import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CertificationCreated } from "../generated/schema"
import { CertificationCreated as CertificationCreatedEvent } from "../generated/Certificate/Certificate"
import { handleCertificationCreated } from "../src/certificate"
import { createCertificationCreatedEvent } from "./certificate-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let hash = "Example string value"
    let message = "Example string value"
    let category = "Example string value"
    let author = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let holder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let timestamp = BigInt.fromI32(234)
    let newCertificationCreatedEvent = createCertificationCreatedEvent(
      id,
      hash,
      message,
      category,
      author,
      holder,
      timestamp
    )
    handleCertificationCreated(newCertificationCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CertificationCreated created and stored", () => {
    assert.entityCount("CertificationCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hash",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "category",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "author",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "holder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CertificationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
