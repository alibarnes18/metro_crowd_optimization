const { calculateCongestion } = require('../processing/congestionCalc');

test('İzdiham düzgün hesablanmalıdır', () => {
    expect(calculateCongestion(500, 1000)).toBe(0.5);
});

test('Tutum 0 olarsa, nəticə 0 olmalıdır (Error handling)', () => {
    expect(calculateCongestion(500, 0)).toBe(0);
});
 