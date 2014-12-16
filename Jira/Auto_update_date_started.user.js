// ==UserScript==
// @name        Auto update date started
// @namespace   com.thzinc.jira
// @description Automatically updates Date Started based on Time Spent
// @version     1
// @grant       none
// ==/UserScript==
(function ($) {
    var suffixes = {
        's': 1,
        'm': 60,
        'h': 3600,
        'd': 86400,
        'w': 604800
    };

    function getSeconds(timeSpan) {
        return timeSpan
            .split(/\s+/)
            .map(function (ts) {
                var suffix = ts.substring(ts.length - 1);
                var multiplicand = parseFloat(ts.substring(0, ts.length - 1), 10);
                var multiplier = suffixes[suffix || 'm'] || 1;
                return Math.round(multiplicand * multiplier);
            })
            .reduce(function(a,b) {return a+b;});
    }

    function adjustTime(date, timeSpan, isAddition) {
        var seconds = date.getSeconds();
        if (isAddition)
            seconds += getSeconds(timeSpan);
        else
            seconds -= getSeconds(timeSpan);

        date.setSeconds(seconds);
        return date;
    }

    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    function formatDate(date) {
        return [
            date.getDate(),
            '/',
            months[date.getMonth()],
            '/',
            date.getFullYear() % 100,
            ' ',
            date.getHours() % 12 || '12',
            ':',
            date.getMinutes() < 10 ? '0' : '',
            date.getMinutes(),
            ' ',
            date.getHours() < 12 ? 'AM' : 'PM'

        ].join('');
    }
    
    $(function () {
        $('body')
           .on('keyup focus', '#log-work-time-logged', function (ev) {
               var input = $(ev.currentTarget);
               
               if (!input.prop('log-work-time-auto-update-enabled'))
               {
                   input.after('(Auto update enabled)');
                   input.prop('log-work-time-auto-update-enabled', true);
               }
               
               if (!input.val())
                   return;
               
               var adjustedDate = adjustTime(new Date(), input.val());
               
               if (isNaN(adjustedDate.getFullYear()))
                   return;
               
               $('#log-work-date-logged-date-picker').val(formatDate(adjustedDate));
           });
    })
}(jQuery));