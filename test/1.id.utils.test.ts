import assert from "node:assert";
import { test } from "node:test";
import { idUtils } from "../src/utils/id.utils.ts";

// Retorno determinista

test('should extract the seed from an id', function(){
  // Arrange
  const inputId = '2.1'
  // Act
  const actualSeed = idUtils.extractSeed(inputId);
  // Assert
  const expectedSeed = 2;
  // assert.strictEqual(actualSeed, expectedSeed);
  assert.ok(actualSeed===expectedSeed);
})


// Retorno aleatorio

test('should generate ids of length more than 3', async ()=>{
 // Arrange

 // Act 
 const actualId = await idUtils.generate();
 // Assert
 const actualLength = actualId.length;
 const expectedLength = 3;
 assert.ok(actualLength >= expectedLength );
})