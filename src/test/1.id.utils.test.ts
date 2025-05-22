// Retorno determinista

import { file } from "../app/file/file.adapter";
import { idUtils } from "../app/utils/id.utils";

test("should extract the seed from an id", function () {
  // Arrange
  const inputId = "2.1";
  // Act
  const actualSeed = idUtils.extractSeed(inputId);
  // Assert
  const expectedSeed = 2;
  // assert.strictEqual(actualSeed, expectedSeed);
  expect(actualSeed).toBe(expectedSeed);
});

// Retorno aleatorio

test("should generate ids of length more than 3", async () => {
  // Arrange

  // Act
  const actualId = await idUtils.generate();
  // Assert
  const actualLength = actualId.length;
  const expectedLength = 3;
  //assert.ok(actualLength >= expectedLength);
  expect(actualLength).toBeGreaterThanOrEqual(expectedLength);
});

// Cambio de estado

test("last should return a bigger last number after generating an id", async () => {
  // Arrange
  const expectedLast = idUtils.last;
  await idUtils.generate();
  // Act
  const actualLast = idUtils.last;
  // Assert
  expect(actualLast).toBeGreaterThan(expectedLast);
});

// Efectos secundarios

test("seedJson should match seed from generated id", async () => {
  // Arrange
  const id = await idUtils.generate();
  const expectedSeed = idUtils.extractSeed(id);
  // Act
  const actualSeed = await file.readJson("seed.json");
  // Assert
  expect(actualSeed).toBe(expectedSeed);
});
