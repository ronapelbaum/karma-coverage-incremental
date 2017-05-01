const incrementReporter = require('../lib/karma-plugin')['reporter:increment'][1];

describe('incrementReporter spec', () => {
  describe('export spec', () => {
    it('should export properly', () => {
      expect(incrementReporter).toBeDefined();
    });
    it('should export a function', () => {
      expect(typeof incrementReporter).toBe('function');
    });
  });

  describe('requirements spec', () => {
    describe('coverage reporter', () => {
      it('should throw error if no "coverage" reporter defined', () => {
        expect(() => incrementReporter({})).toThrow(new Error('coverage reporter should be used'));
      });
    });
    describe('json-summary coverage-reporter', () => {
      const coverageReporter = { type: 'html' };
      const config = {
        reporters: ['coverage'],
      };
      const errMsg = 'json-summary coverage-reporter should be used';
      it('should throw error if no "json-summary" coverage-reporter defined', () => {
        config.coverageReporter = coverageReporter;
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
      it('should throw error if no "coverage" reporter defined', () => {
        config.coverageReporter = [coverageReporter];
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
    });
  });
});
