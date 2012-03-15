TextualScripts
===========

Did you know you can add JavaScript to your Textual theme?! TextualScripts
makes adding behavior to Textual awesome. It includes jQuery if you're
a DOM wussy, and supports CoffeeScript if you're a hipster.

TextualScripts (as you can see from the fork history on Github) began life
as ["limescripts"](https://github.com/rpflorence/limescripts), authored by
the awesome Ryan Florence. It has been (heavily) adapted for use in Textual.
Thanks Ryan!

Installation
------------

1. Clone this repository into your Textual Styles directory. You can
   find it by opening Textual, Preferences > Styles > Open Styles Folder

2. Replace `design.css` and `userInterface.plist` with the style/theme
   files of your choice. The provided defaults are from the "Astria"
   theme provided with Textual. You can also edit these files directly.

3. Launch Textual, open Preferences > Styles and select "TextualScripts"
   as your style/theme.

Add your own scripts
--------------------

1. Create a `.js` or `.coffee` file in `lib/`

2. Compile it (if it's a .coffee file)

3. Load it in `scripts.js` at the bottom like this:

   ```javascript
   Textual.include_js("lib/gist.js");
   ```

API
---

TextualScripts is essentially an event system. When a message is added, a
bunch of events are triggered. Do see the examples in `lib/`, there's
also some decent documentation in `scripts.js` about all the event
types you can bind to.

### Example

Here's the twitter script:

```coffeescript
# You bind to events like 'link'. 'link' will be triggered for every
# anchor tag found in the new message. Read `limescripts.js` to get an
# idea for all the events available.

bind 'link', (href, line) ->
  # href is the link's href
  # line is the top level message element

  # `this` is the anchor element, though its not used in this script
  # most events are bound to an element that makes the most sense

  matches = href.match /http[s]?:\/\/twitter.com\/(.+)\/status\/(.+)/
  return unless matches
  url = "http://api.twitter.com/1/statuses/show/#{matches[2]}.json?callback=?"

  # jQuery is available
  $.getJSON url, (data) ->
    tweet = $ '<span/>'
    tweet.html """
      tweet by: <i class=twitter-user-name>#{data.user.name}</i>
      <span class=twitter-text>#{data.text}</span>
    """

    # the message element is usually where you want to add stuff
    $(line).find('.message').append tweet

```

License & Copyright
-------------------

For all scripts in this repository:

- [MIT-Style
  license](http://www.opensource.org/licenses/mit-license.php)
- Copyright [Tom Metge](http://accident-prone.com)
- Adapted from "limescripts" by [Ryan Florence](http://ryanflorence.com)
- Astria theme by Alex S¿rlie



