import { Calculator } from './calculator';

describe('Test for calculator', () => {
  it('#mult should return a nine', () => {
    //Arrange
    const calculator = new Calculator();
    //Actr
    const result = calculator.mul(3, 3);
    //Assert
    expect(result).toEqual(9);
  });

  it('#mult should return a four', () => {
    //Arrange
    const calculator = new Calculator();
    //Actr
    const result = calculator.mul(2, 2);
    //Assert
    expect(result).toEqual(4);
  });

  it('#div should return a some numbers', () => {
    //Arrange
    const calculator = new Calculator();
    //Actr
    expect(calculator.div(6, 3)).toEqual(2);
    expect(calculator.div(5, 2)).toEqual(2.5);
  });

  it('#div should return null', () => {
    const calculator = new Calculator();

    expect(calculator.div(5, 0)).toBeNull;
  });

  it('tests matchers', () => {
    const name = 'edwin';
    let name2;
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    expect('123').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('apples');
  });
});
