const coverageUpdater = require('../index.js')['coverage-updater'];

describe('coverage-updater spec', () => {
  describe('getCoverageSummaryTotal spec', () => {
    // it('', () => {});
    it('should return default with zeros', () => {
      const actual = coverageUpdater.getCoverageSummaryTotal({}, 0);
      expect(actual.statements).toBe(0);
      expect(actual.branches).toBe(0);
      expect(actual.functions).toBe(0);
      expect(actual.lines).toBe(0);
    });
  });
});
