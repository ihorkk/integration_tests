import { faker } from "@faker-js/faker";

export function generateFullName() {
  return faker.person.fullName();
}

export function generateEmail() {
  return faker.internet.email();
}

export function generatePassword() {
  return faker.internet.password();
}

export function generateBoolean() {
  return faker.datatype.boolean();
}

export function generateProductName() {
  return faker.music.artist() + " " + faker.music.songName();
}

export function generateProductDescription() {
  return faker.music.album() + " " + faker.music.genre();
}

export function generateInteger(min?: number, max?: number) {
  return faker.number.int({ min, max });
}
