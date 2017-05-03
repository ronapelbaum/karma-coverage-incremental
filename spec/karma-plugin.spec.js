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
        const config = {};
        expect(() => incrementReporter(config)).toThrow(new Error('coverage reporter should be used'));
        config.reporters = ['aaa'];
        expect(() => incrementReporter(config)).toThrow(new Error('coverage reporter should be used'));
      });
      it('should NOT throw error if "coverage" reporter defined', () => {
        const config = {reporters: ['coverage']};
        expect(() => incrementReporter(config)).not.toThrow(new Error('coverage reporter should be used'));
      });
    });
    describe('json-summary coverage-reporter', () => {
      const coverageReporter = { type: 'html' };
      const jsonSummaryReporter = { type: 'json-summary' };
      const config = {
        reporters: ['coverage'],
      };
      const errMsg = 'json-summary coverage-reporter should be used';

      it('should throw error if no "json-summary" coverage-reporter defined as main reporter', () => {
        config.coverageReporter = coverageReporter;
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
      it('should throw error if no "json-summary" coverage-reporter defined as a reporter in reporters array', () => {
        config.coverageReporter = {reporters: [coverageReporter]};
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
      it('should NOT throw error if "json-summary" coverage-reporter defined as main reporter', () => {
        config.coverageReporter = jsonSummaryReporter;
        expect(() => incrementReporter(config)).not.toThrow(new Error(errMsg));
      });
      it('should NOT throw error if "json-summary" coverage-reporter defined as a reporter in reporters array', () => {
        config.coverageReporter = {reporters: [coverageReporter, jsonSummaryReporter]};
        expect(() => incrementReporter(config)).not.toThrow(new Error(errMsg));
      });

    });
  });
});
