export class Calculator {
  mul(a: number, b: number) {
    return a * b;
  }

  div(a: number, b: number) {
    if (b == 0) {
      return null;
    } else {
      return a / b;
    }
  }
}
