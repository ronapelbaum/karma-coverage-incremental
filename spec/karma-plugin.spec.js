const incrementReporter = require('../lib/karma-plugin')['reporter:increment'][1];
const coverageUpdater = require('../lib/coverage-updater');

describe('incrementReporter spec', () => {
  const coverageReporter = 'coverage';
  const htmlCoverageReporter = {type: 'html'};
  const jsonSummaryCoverageReporter = {type: 'json-summary'};

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
        const config = {reporters: [coverageReporter]};
        expect(() => incrementReporter(config)).not.toThrow(new Error('coverage reporter should be used'));
      });
    });
    describe('json-summary coverage-reporter', () => {
      const config = {
        reporters: [coverageReporter],
      };
      const errMsg = 'json-summary coverage-reporter should be used';

      it('should throw error if no "json-summary" coverage-reporter defined as main reporter', () => {
        config.coverageReporter = htmlCoverageReporter;
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
      it('should throw error if no "json-summary" coverage-reporter defined as a reporter in reporters array', () => {
        config.coverageReporter = {reporters: [htmlCoverageReporter]};
        expect(() => incrementReporter(config)).toThrow(new Error(errMsg));
      });
      it('should NOT throw error if "json-summary" coverage-reporter defined as main reporter', () => {
        config.coverageReporter = jsonSummaryCoverageReporter;
        expect(() => incrementReporter(config)).not.toThrow(new Error(errMsg));
      });
      it('should NOT throw error if "json-summary" coverage-reporter defined as a reporter in reporters array', () => {
        config.coverageReporter = {reporters: [htmlCoverageReporter, jsonSummaryCoverageReporter]};
        expect(() => incrementReporter(config)).not.toThrow(new Error(errMsg));
      });
    });
  });

  describe('use of coverageUpdater spec', () => {

    let config;
    const incrementConfigDefault = {isKarma: true};
    const incrementConfig = {flexibility: 0.3};

    beforeEach(() => {
      spyOn(coverageUpdater, 'updateCodeCoverage');
      config = {
        reporters: [coverageReporter],
        coverageReporter: jsonSummaryCoverageReporter,
      };
    });
    it('should call updateCodeCoverage() with default config', () => {
      incrementReporter(config);
      expect(coverageUpdater.updateCodeCoverage).toHaveBeenCalledWith(incrementConfigDefault);
    });
    it('should call updateCodeCoverage()', () => {
      config.incrementConfig = incrementConfig;
      incrementReporter(config);
      expect(coverageUpdater.updateCodeCoverage).toHaveBeenCalledWith(Object.assign(incrementConfig, incrementConfigDefault));
    });
  });
});
