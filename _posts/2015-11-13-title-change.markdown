---
layout: post
title:  "Title Change for Page Parking"
date:   2015-11-13 09:00:00
categories: HTML5
---

<a href="http://caniuse.com/#feat=pagevisibility">Can i use the HTML5 Visibility API?</a>

<code><pre>
// save the title for later
var docTitle = document.title;
// change the title when they move away
window.addEventListener('blur', function() {
    document.title = "💰💰💰 Don't forget about this...";
    flashInterval = setInterval(flasher, 1000);
    function flasher() {
    	if (document.title == "💰💰💰Don't forget about this...") {
    		document.title = docTitle;
    	} else {
    		document.title = "💰💰💰Don't forget about this...";
    	}
    }
});
// add the title back in when they come back
window.addEventListener('focus', function() {
    document.title = docTitle;
    clearInterval(flashInterval);
});
</pre></code>

<script>
// save the title for later
var docTitle = document.title;
// change the title when they move away
window.addEventListener('blur', function() {
    document.title = "💰💰💰 Don't forget about this...";
    flashInterval = setInterval(flasher, 1000);

    function flasher() {
    	if (document.title == "💰💰💰Don't forget about this...") {
    		document.title = docTitle;
    	} else {
    		document.title = "💰💰💰Don't forget about this...";
    	}
    }
});
// add the title back in when they come back
window.addEventListener('focus', function() {
    document.title = docTitle;
    clearInterval(flashInterval);

});
</script>