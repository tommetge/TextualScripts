/*!
 * scripts.js (c) Tom Metge
 * https://github.com/tommetge/limescripts
 * 
 * Adapted from Ryan Florence's "limescripts":
 * https://github.com/rpflorence/limescripts
 * 
 * MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

// Mechanism to pull in additional CSS or JavaScript files

// Textual.include_js("jquery.min.js");
// Textual.include_css("more_theme.css");
Textual.include_js("vendor/jquery-1.7.1.min.js");


var events = {};
this.bind = function (event, handler) {
  if (events[event] == null) events[event] = [];
  events[event].push(handler);
};

// triggers all the events
function triggerEvents (line) {
  var els = line.querySelectorAll('*');
  for (var i = 0, l = els.length; i < l; i++) {
    triggerElementEvents(els[i], line);
  }
}

function triggerElementEvents (el, line) {

  // link event
  if (el.tagName === 'A') {
    trigger('link', el, [el.getAttribute('href'), line]);
  }

  // message:#{type} event
  if (el.className === 'message') {
    trigger('message:' + el.className, el, [line]);
  }

  // className event
  trigger(el.className, el, [line]);
}

// triggers an event
function trigger (name, context, args) {
  var handlers = events[name];
  if (!handlers) return;
  for (var i = 0, l = handlers.length; i < l; i++) {
    handlers[i].apply(context, args);
  }
}


// Function called when new message from IRC has been posted to display

// Textual.newMessagePostedToDisplay = function(lineNumber)
// {
//		var newLine = document.getElementById("line" + lineNumber);
// }
Textual.newMessagePostedToDisplay = function(lineNumber) {
  var message = document.getElementById("line" + lineNumber);
  if (message) {
    triggerEvents(message);
  }
}


// Functions called for contextual menus used within WebView
// DO NOT change without knowledge of what to do. 
// Safe to remove from source code if not needed. 

// Textual.on_url = function() { app.setUrl(event.target.innerHTML); }
// Textual.on_addr = function() { app.setAddr(event.target.innerHTML); }
// Textual.on_chname = function() { app.setChan(event.target.innerHTML); }
// Textual.on_ct_nick: function() { app.setNick(event.target.innerHTML); }
// Textual.on_nick = function() { app.setNick(event.target.parentNode.parentNode.getAttribute('nick')); }

Textual.include_js("lib/helpers.js");
Textual.include_js("lib/gist.js");
Textual.include_js("lib/twitter.js");