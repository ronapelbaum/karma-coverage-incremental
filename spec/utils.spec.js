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
      const stat1 = jasmine.createSpyObj('Stat', ['isDirectory']);
      stat1.isDirectory.and.returnValue(true);
      const stat2 = jasmine.createSpyObj('Stat', ['isDirectory']);
      const folderContent = [stat1, stat2];

      fs.existsSync.and.returnValue(true);
      fs.statSync.and.returnValue(true);
      fs.readdirSync.and.returnValue(folderContent);

      const actual = utils.getDirectories();

      expect(actual.pop).toBe(stat1);
    });
  });
});
