I decided to see what I could do with Node.js today. I've never used it before, but understood the concept of it. It was really nice to work with, I didn't tear my hair out too much, and after a few hours learning some really basic Socket.IO stuff by making a web chat room, I tried this.

This Twittery-Nodey-Sockety-sort-of-thing uses [ntwitter](https://github.com/AvianFlu/ntwitter) to stream tweets from the Twitter Streaming API, and pipes them through to clients with [Socket.IO](http://socket.io/). It all runs quite nicely on [Heroku](http://heroku.com/).

It currently attempts to stream *all* tweets that have coordinates in them, and the page displays the latest 100 at any given time, removing them as the queue fills up. Each marker has a tooltip that displays the tweet text.