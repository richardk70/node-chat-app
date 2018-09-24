const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

// isRealString
    // should reject non-string values
    // should reject strings w/ only spaces
    // should allow strings w/ non-space characters

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var result = isRealString(9875);
        expect(result).toBeFalsy();
    });

    it('should reject strings w/ only spaces', () => {
        var result = isRealString('    ');
        expect(result).toBeFalsy();
    });

    it('should allow strings w/ non-space characters', () => {
        var result = isRealString(' engineering');
        expect(result).toBeTruthy();
    });
});