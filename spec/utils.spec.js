const utils = require('../lib/utils');
const fs = require('fs');

describe('utils spec', () => {
  beforeEach(() => {
    spyOn(fs, 'existsSync');
    spyOn(fs, 'readdirSync');
    spyOn(fs, 'readFileSync');
    spyOn(fs, 'writeFileSync');
    spyOn(fs, 'statSync');
  });
  describe('getDirectories() spec', () => {
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

  describe('getJson() spec', () => {
    it('should return empty object if no file', () => {
      fs.existsSync.and.returnValue(false);
      expect(utils.getJson()).toEqual({});
    });
    it('should throw Error if file has no json', () => {
      fs.existsSync.and.returnValue(true);
      fs.readFileSync.and.returnValue('a');
      expect(() => utils.getJson()).toThrowError();
    });
    it('should return empty object if file has empty json', () => {
      fs.existsSync.and.returnValue(true);
      fs.readFileSync.and.returnValue('{}');
      expect(utils.getJson()).toEqual({});
    });
    it('should return object in file', () => {
      fs.existsSync.and.returnValue(true);
      fs.readFileSync.and.returnValue('{ "a" : 1 }');
      expect(utils.getJson()).toEqual({ a: 1 });
    });
  });

  describe('writeJson() spec', () => {
    const filePath = 'a.json';
    const data = { a: 1 };
    it('should call writeFileSync with json', () => {
      utils.writeJson(filePath, data);
      expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, '{\n  "a": 1\n}\n', 'utf8');
    });
  });
  describe('writeYaml spec', () => {
    xit('should empty array if no dir', () => {
      utils.writeYaml('.istanbul.yml', {});
    });
  });
});
