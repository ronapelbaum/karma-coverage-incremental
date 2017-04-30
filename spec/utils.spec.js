const utils = require('../index.js')['utils'];
const fs = require('fs');

describe('utils spec', () => {
  describe('getDirectories spec', () => {
    beforeEach(() => {
      spyOn(fs, 'existsSync');
      spyOn(fs, 'readdirSync');
      spyOn(fs, 'statSync');
    });
    it('should empty array if no dir', () => {
      fs.existsSync.and.returnValue(false);
      const actual = utils.getDirectories();
      expect(actual).toEqual([]);
    });
  });
});
