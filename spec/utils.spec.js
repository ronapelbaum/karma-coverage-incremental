const utils = require('../index.js').utils;
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
    it('should filter not "isDirectory"', () => {
      fs.existsSync.and.returnValue(true);
      fs.readdirSync.and.returnValue(['a', 'b']);
      fs.statSync.and.callFake((name) => {
        const spyObj = jasmine.createSpyObj('Stat', ['isDirectory']);
        spyObj.isDirectory.and.returnValue(name === 'a');
        return spyObj;
      });

      const actual = utils.getDirectories('');

      expect(actual.pop()).toBe('a');
    });
  });

  describe('writeYaml spec', () => {
    xit('should empty array if no dir', () => {
      utils.writeYaml('.istanbul.yml', {});
    });
  });
});
