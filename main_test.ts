Deno.test("example test", () => {
    const sum = 2 + 2;
    if (sum !== 4) {
      throw new Error("Sum does not match!");
    }
  });