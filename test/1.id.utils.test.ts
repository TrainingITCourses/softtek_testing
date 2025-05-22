import assert from "node:assert";
import { test } from "node:test";
import { file } from "../src/file/file.adapter.ts";
import { idUtils } from "../src/utils/id.utils.ts";

// Retorno determinista

test("should extract the seed from an id", function () {
  // Arrange
  const inputId = "2.1";
  // Act
  const actualSeed = idUtils.extractSeed(inputId);
  // Assert
  const expectedSeed = 2;
  // assert.strictEqual(actualSeed, expectedSeed);
  assert.ok(actualSeed === expectedSeed);
});

// Retorno aleatorio

test("should generate ids of length more than 3", async () => {
  // Arrange

  // Act
  const actualId = await idUtils.generate();
  // Assert
  const actualLength = actualId.length;
  const expectedLength = 3;
  assert.ok(actualLength >= expectedLength);
});

// Cambio de estado

test("should change last value", async () => {
  // Arrange
  //const initialLast = idUtils.last;
  // Act
  const id = await idUtils.generate();
  const expectedLast = id.split(".")[1];
  const actualLast = idUtils.last;
  // Assert
  assert.equal(actualLast, expectedLast);
  //const newLast = idUtils.last;
  // assert.ok(newLast > initialLast);
});

// Efecto secundario

test("should write a seed json file", async () => {
  // Arrange

  // Act
  const id = await idUtils.generate();
  const expectedSeed = id.split(".")[0];
  const actualSeed = await file.readJson("seed.json");
  // Assert
  assert.equal(actualSeed, expectedSeed);
});
