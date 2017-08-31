# freeCodeCamp Basejumps

[Visit a running instance of this app.][1]

Basejumps, probably stemming from "[BASE jumping][2]," form the back-end of
freeCodeCamp's curriculum. They are backend-oriented projects which have campers
following specific but flexible user stories in order to build APIs and dynamic
web applications.

This repository collects all the basejumps I've built and published to the npm
registry, and serves them all as one application. Previously I ran each 
basejump as its own application on Heroku but unverified Heroku accounts can
only run up to five applications. Other platforms exist but one of this
repository's goals is to make hosting on Heroku a viable option.

[1]: https://stormy-falls-19391.herokuapp.com/
[2]: http://www.basejumper.com/Articles/General/The_History_of_BASE_Jumping_657.html

## How it Works

`namespace.js` maps an array of Koa applications to mountable middleware.  
`basejumps.js` lists the microservices to be mapped to middleware.  
`server.js` mounts any and all middleware and creates a server for the main app.

[koa-mount][3] is used to mount any basejumps onto the main application,
[kcors][4] is used to provide CORS headers, and [Koa][5] is used to serve
requests.

[3]: https://github.com/koajs/mount
[4]: https://github.com/koajs/cors
[5]: http://koajs.com/

## How to Use

Feel free to experiment. Otherwise make sure Node is version 8.1.4 or higher and
that any necessary environment variables are set, install the dependencies, and
run `npm start`.

## API Projects

* [Timestamp Microservice][5]
* [Request Header Parser Microservice][6]
* [URL Shortener Microservice][7]
* [Image Search Abstraction Layer][8]
* [File Metadata Microservice][9]

[5]: https://github.com/augmt/timestamp-microservice
[6]: https://github.com/augmt/request-header-parser-microservice
[7]: https://github.com/augmt/url-shortener-microservice
[8]: https://github.com/augmt/image-search-abstraction-layer
[9]: https://github.com/augmt/file-metadata-microservice

## Dynamic Web Application Projects

_Note_: May or may not be added at a later date.

* [Voting App][10]
* [Nightlife Coordination App][11]
* [Chart the Stock Market][12]
* [Manage a Book Trading Club][13]
* [Pinterest Clone][14]

[10]: https://www.freecodecamp.org/challenges/build-a-voting-app
[11]: https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app
[12]: https://www.freecodecamp.org/challenges/chart-the-stock-market
[13]: https://www.freecodecamp.org/challenges/manage-a-book-trading-club
[14]: https://www.freecodecamp.org/challenges/build-a-pinterest-clone
