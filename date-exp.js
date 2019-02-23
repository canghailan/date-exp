(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.DateExp = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    function int(value) {
        var n = parseInt(value);
        return isNaN(n) ? 0 : n;
    }

    function format(expression, context) {
        return expression.replace(/yyyy|MM|dd|HH|mm|ss|SSS|e|Z/g, function (name) {
            return context[name];
        });
    }

    function isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function getMonthDays(year, month) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        if (month === 1 && isLeapYear(year)) {
            days += 1;
        }
        return days;
    }

    function Duration(duration) {
        if (duration) {
            var r = /P(\d+)W|P((\d+)Y)?((\d+)M)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?/.exec(duration) || [];
            this.years = int(r[3]);
            this.months = int(r[5]);
            this.dates = int(r[7]);
            this.hours = int(r[10]);
            this.minutes = int(r[12]);
            this.seconds = int(r[14]);
            this.weeks = int(r[1]);
        } else {
            this.years = 0;
            this.months = 0;
            this.dates = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.weeks = 0;
        }
    }

    function DateExp(expression) {
        var re = /\s*([+-])\s*(P[^\s+-]+)/g;
        var r = re.exec(expression);
        if (r) {
            this.expr = [expression.substring(0, r.index).trim()];
            while (r) {
                this.expr.push(r[1]);
                this.expr.push(r[2].trim());
                r = re.exec(expression);
            }
        } else {
            this.expr = [expression.trim()];
        }
    }

    DateExp.context = function (date) {
        var d = date || new Date();
        var Y = d.getFullYear();
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var S = d.getMilliseconds();
        var e = d.getDay() == 0 ? 7 : d.getDay();
        var tz = - d.getTimezoneOffset() * 100 / 60 - d.getTimezoneOffset() % 60;
        var YYYY = String(Y).padStart(4, '0');
        var MM = String(M).padStart(2, '0');
        var DD = String(D).padStart(2, '0');
        var hh = String(h).padStart(2, '0');
        var mm = String(m).padStart(2, '0');
        var ss = String(s).padStart(2, '0');
        var SSS = String(S).padStart(3, '0');
        var Z = (tz >= 0) ? ('+' + String(tz).padStart(4, '0')) : ('-' + String(-tz).padStart(4, '0'));
        return {
            Y: Y,
            M: M,
            D: D,
            h: h,
            m: m,
            s: s,
            S: S,
            e: e,
            yyyy: YYYY,
            MM: MM,
            dd: DD,
            HH: hh,
            mm: mm,
            ss: ss,
            SSS: SSS,
            Z: Z
        };
    };

    DateExp.format = function (date, expression) {
        return format(expression || 'yyyy-MM-ddTHH:mm:ss.SSSZ', DateExp.context(date));
    };

    DateExp.duration = function (expression) {
        return new Duration(expression);
    };

    DateExp.adjust = function (date, duration, direction) {
        var months = duration.years * 12 + duration.months;
        var seconds =
            duration.weeks * 7 * 24 * 60 * 60 +
            duration.dates * 24 * 60 * 60 +
            duration.hours * 60 * 60 +
            duration.minutes * 60 +
            duration.seconds;
        var d = new Date(date.getTime());
        var m = d.getFullYear() * 12 + d.getMonth() + direction * months;
        var year = Math.floor(m / 12);
        var month = m % 12;
        var days = getMonthDays(year, month);
        if (days < d.getDate()) {
            d.setDate(days);
        }
        d.setFullYear(year);
        d.setMonth(month);
        d.setTime(d.getTime() + direction * seconds * 1000);
        return d;
    }

    DateExp.prototype.exec = function (date) {
        var context = DateExp.context(date);
        var result = new Date(format(this.expr[0], context));
        for (var i = 1; i < this.expr.length; i += 2) {
            var direction = this.expr[i] === '-' ? -1 : 1;
            var duration = DateExp.duration(format(this.expr[i + 1], context));
            result = DateExp.adjust(result, duration, direction);
        }
        return result;
    };

    DateExp.prototype.toString = function () {
        return this.expr.join(' ');
    };

    return DateExp;
}));