// ==UserScript==
// @name        Ignore whitespace option on Bitbucket
// @namespace   com.thzinc.bitbucket
// @include     https://bitbucket.org/*
// @version     1
// @grant       none
// ==/UserScript==
(function ($) {
  $(function () {
    $('.pullrequest-list .title a')
     .each(function () {
       var self = $(this);
       var sensitive = self.attr('href');
       var insensitive = sensitive + '?w=1';
       self.data('sensitive', sensitive);
       self.data('insensitive', insensitive);
       self.attr('href', self.data(localStorage['ignore-whitespace'] ? 'insensitive' : 'sensitive'));
     });
    
    var checkbox = $('<input type="checkbox" id="ignore-whitespace"/>')
     .prop('checked', !!localStorage['ignore-whitespace'])
     .on('change', function () {
       if ($(this).prop('checked'))
        localStorage['ignore-whitespace'] = true;
       else
         delete localStorage['ignore-whitespace'];
       
       $('.pullrequest-list .title a')
        .each(function () {
          var self = $(this);
          self.attr('href', self.data(localStorage['ignore-whitespace'] ? 'insensitive' : 'sensitive'));
        })
     });
    
    var label = $('<label for="ignore-whitespace"/>')
     .append(checkbox)
     .append("Ignore White Space");
    
    var li = $('<li/>').append(label);
    $('.filter-container .filter-status').append(li);
  });
  
  $(function () {
    var isWhiteSpaceIgnored = false;
    var search = location.search
     .split(/[\?\&]+/g)
     .filter(function (e) {
       var x = /^w=|^w$/.test(e);
       isWhiteSpaceIgnored = isWhiteSpaceIgnored || x;
       return !x;
     })
     .join('&');
    var baseUrl = location.pathname + '?' + search;
    var button = $('<a class="aui-button">')
     .attr('href', isWhiteSpaceIgnored ? baseUrl : baseUrl + 'w=1')
     .text(isWhiteSpaceIgnored ? 'View White Space Differences' : 'Ignore White Space');
  
    $('#pullrequest-actions')
     .append($('<div class="aui-buttons">').append(button));
  });
}(jQuery));
