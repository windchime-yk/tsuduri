import { assertEquals, assertInstanceOf } from "@std/assert";
import { Result, SuccessResult as SuccessAssertResult } from "../../model.ts";

type ErrorAssertResult = {
  success: false;
  error: { name: string; message: string };
};

type AssertResult = {
  <T>(result: Result<T>, expected: SuccessAssertResult<T>): void;
  <T>(result: Result<T>, expected: ErrorAssertResult): void;
};

/**
 * Result型関数をアサートする
 * @param result Result型関数
 * @param expected 期待値
 */
export const assertResult: AssertResult = <T>(
  result: Result<T>,
  expected: SuccessAssertResult<T> | ErrorAssertResult,
) => {
  assertEquals(result.success, expected.success);

  if ("result" in expected) {
    if (!result.success) throw new Error("Expected success but got failure");
    assertEquals(result.result, expected.result);
  } else {
    if (result.success) throw new Error("Expected failure but got success");
    assertInstanceOf(result.error, Error);
    assertEquals(result.error.name, expected.error.name);
    assertEquals(result.error.message, expected.error.message);
  }
};
