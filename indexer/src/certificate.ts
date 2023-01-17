import {
  CertificationCreated as CertificationCreatedEvent,
  CoffeeBought as CoffeeBoughtEvent,
} from "../generated/Certificate/Certificate";
import { Certification, Coffee } from "../generated/schema";

export function handleCertificationCreated(
  event: CertificationCreatedEvent
): void {
  let certification = new Certification(event.params.id.toString());
  certification.hash = event.params.hash;
  certification.message = event.params.message;
  certification.category = event.params.category;
  certification.author = event.params.author;
  certification.holder = event.params.holder;
  certification.timestamp = event.block.timestamp;

  certification.save();
}

export function handleCoffeeBought(event: CoffeeBoughtEvent): void {
  let coffee = new Coffee(event.params.id.toString());
  coffee.buyer = event.params.buyer;
  coffee.holder = event.params.holder;
  coffee.message = event.params.message;
  coffee.timestamp = event.block.timestamp;

  coffee.save();
}
