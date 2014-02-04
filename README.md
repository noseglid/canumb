[![Build Status](https://travis-ci.org/noseglid/canumb.png?branch=master)](https://travis-ci.org/noseglid/canumb)

# Canumb - The number cruncher

Aims to be a simple conversion tool between various bases. Currently
2 (binary), 8 (octal), 10 (decimal) and 16 (hexadecimal) is supported.

Canumb supports [arbitrary precision][ArbitraryPrecision] -
you may convert a number of any size.
Very useful for those long network protocol bit-streams.

Only unsigned numbers at this point, feel free to help out improve support.

It includes a hefty web frontend which makes usage easy. Single-page
applications seems to be the latest buzz right now, and so this follows
that vision. It is [hosted at heroku for your leisure][CanumbAtHeroku].

## See it in action
A deployment of canumb is [available at heroku][CanumbAtHeroku].

## Contribute
Just make a pull request and your contribution will be considered (and assuming it's useful, merged) as soon as possible. This'll get your name on the contributors list aswell.

### Contributors
* `Alexander Olsson <noseglid at gmail.com>`

[CanumbAtHeroku]: https://canumb.herokuapp.com
[ArbitraryPrecision]: http://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic
