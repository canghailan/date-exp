const DateExp = require('./date-exp');

console.log(new DateExp('yyyy-MM-dd HH:mm:ss.SSSZ-PeD+P1D').toString());
// now
console.log(new DateExp('yyyy-MM-dd HH:mm:ss').exec());
// today
console.log(new DateExp('yyyy-MM-dd').exec());
// format
console.log(DateExp.format(new DateExp('yyyy-MM-dd HH:mm:ss.SSSZ').exec(), 'yyyy-MM-dd HH:mm:ss.SSSZ'));
// last Monday
console.log(DateExp.format(new DateExp('yyyy-MM-dd HH:mm:ss.SSSZ - PeD + P1D').exec()));
// test Feb
console.log(DateExp.format(new DateExp('yyyy-03-31 - P1M').exec()));
// test Feb
console.log(DateExp.format(new DateExp('yyyy-03-31 - P1M').exec(new Date(2000, 1, 1))));