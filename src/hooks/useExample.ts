interface useExample {
  sum: (a: number, b: number) => number;
}

export function useExample(): useExample {
  const sum = (a: number, b: number) => a + b;

  return {
    sum,
  };
}
