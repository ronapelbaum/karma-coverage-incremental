const coverageUpdater = require('../index.js')['coverage-updater'];

describe('coverage-updater spec', () => {
  describe('getCoverageSummaryTotal spec', () => {
    // it('', () => {});
    it('should return default with zeros', () => {
      const actual = coverageUpdater.getCoverageSummaryTotal({});
      expect(actual.statements).toBe(0);
      expect(actual.branches).toBe(0);
      expect(actual.functions).toBe(0);
      expect(actual.lines).toBe(0);
    });
    it('should read "pct" value - whole numbers', () => {
      const actual = coverageUpdater.getCoverageSummaryTotal({
        total: {
          lines: {
            pct: 2,
          },
        },
      });
      expect(actual.lines).toBe(2);
    });
    it('should read "pct" value - float numbers', () => {
      const actual = coverageUpdater.getCoverageSummaryTotal({
        total: {
          lines: {
            pct: 2.2,
          },
        },
      });
      expect(actual.lines).toBe(2.2);
    });
    it('should read "pct" value - undefined', () => {
      const actual = coverageUpdater.getCoverageSummaryTotal({
        total: {
          lines: {},
        },
      });
      expect(actual.lines).toBe(0);
    });
  });

  describe('calcCheck spec', () => {
    // it('', () => {});
    it('should return newCheck when value no oldCheck', () => {
      const actual = coverageUpdater.calcCheck({
        lines: 2,
      }, 0);
      expect(actual.lines).toBe(2);
    });
    it('should return newCheck value with flex calc', () => {
      const actual = coverageUpdater.calcCheck({
        lines: 2,
      }, 0.5);
      expect(actual.lines).toBe(1.5);
    });
    it('should return oldCheck value, when higher', () => {
      const actual = coverageUpdater.calcCheck({
        lines: 2,
      }, 0.5, {
        lines: 1.7,
      });
      expect(actual.lines).toBe(1.7);
    });
  });
});
