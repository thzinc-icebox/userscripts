thzinc's User Scripts
=====================

These are a collection of my own public user scripts (Greasemonkey, Tampermonkey, *monkey, etc.) that I've found useful.


User scripts for Jira
-----------------------------

[Read more](Jira)


MediaWiki single-column PrefixIndex maker
-----------------------------------------

Does the forced three-column layout of the MediaWiki PrefixIndex annoy you, or worse, prevent you from finding the information you need? Eschew the three-column layout and make it one with this script!

It works on any standard MediaWiki, including Wikipedia.

Live better! Install [`MediaWiki single-column PrefixIndex maker`](MediaWiki single-column PrefixIndex maker.js)


No HTTPS for SuperBetter Forums
-------------------------------

A not-great workaround for the SuperBetter Forums that currently have a revoked SSL certificate. 

Install [`No HTTPS for SuperBetter Forums`](No HTTPS for SuperBetter Forums.js)


Download recordings in ZenDesk
------------------------------

This one's just a bookmarklet to turn an audio player in ZenDesk into a download link.

Drag this link to your bookmarks toolbar: [Add Download Recording Link](javascript:(function()%7B(function%20(%24)%20%7B%24('.audio.player%5Bdata-recording-url%5D').each(function%20(i%2C%20e)%20%7Bvar%20player%20%3D%20%24(e)%3Bvar%20url%20%3D%20player.data('recording-url')%3Bvar%20link%20%3D%20%24('%3Ca%20target%3D%22_blank%22%2F%3E').text('Download%20Recording').attr('href'%2C%20url)%3Bplayer.after(link)%3B%7D)%3B%7D(jQuery))%7D)())
