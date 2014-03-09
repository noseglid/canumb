[![Build Status](https://travis-ci.org/noseglid/canumb.png?branch=master)](https://travis-ci.org/noseglid/canumb)
[![Dependency Status](https://gemnasium.com/noseglid/canumb.png)](https://gemnasium.com/noseglid/canumb)

# Canumb - tools for developers

Canumb aims to crunch data on various forms and turn them into something meaningful.
A variety of inputs are currently supported, such different number base conversions
(decimal to hexadecimal, binary to hexadecimal, octal to decimal, etc),
various encoded format (base64 encoder decoder, uri encoder decoder).
It's built in way to allow for extension when the future demands other input formats
to be crunched.

## See it in action
Canumb is [hosted online for you to try out][CanumbAtHeroku]. You're free to
use this as much as you want, either through the frontend or integrating
in the API.

## Features

### Base conversion

The following conversions are available ([TL;DR][TLDR]: all conversions between base 2 (binary), 8 (octal), 10 (decimal) and 16 (hexadecimal)):

  * Binary to Octal
  * Binary to Decimal
  * Binary to Hexadecimal
  * Octal to Binary
  * Octal to Decimal
  * Octal to Hexadecimal
  * Decimal to Binary
  * Decimal to Octal
  * Decimal to Hexadecimal
  * Hexadecimal to Binary
  * Hexadecimal to Octal
  * Hexadecimal to Decimal

Canumb supports [arbitrary precision][ArbitraryPrecision],
you may convert a number of any size. Well, the algorithm is slow so
less than 1000 digits. But that's still very large numbers.
Very useful for those long network protocol bit-streams.

The binary output may also be aligned (both the API and the frontend supports this),
so you can group them for easier digestion. Typically 8 bits (1 byte) per group is
useful as binary protocols often are octet-aligned.

Only unsigned integer numbers at this point, feel free to help out improve support.

### Encoding and Decoding

Supported encodings:

 * [base64][EncodingBase64]
 * [uri][EncodingUri] (Also knows as percent-encoding)
 * [base85][EncodingBase85]


### Hashing

Canumb can hash data using a wide array of algorithms:

  * [sha1][SHA1]
  * [sha224][SHA2]
  * [sha256][SHA2]
  * [sha384][SHA2]
  * [sha512][SHA2]
  * [mdc2][MDC2]
  * [md4][MD4]
  * [md5][MD5]
  * [ripemd][RIPEMD]
  * [ripemd160][RIPEMD]
  * [whirlpool][Whirlpool]

**Note**: If you're using this, or its accompanying api to hash any password for you site/application, you're insane. All texts into this API is clear-text (albeit maybe HTTPS if the server is set up for this). Don't do that. Don't be that guy.

## Contribute
Just make a pull request and your contribution will be considered (and assuming it's useful, merged) as soon as possible. This'll get your name on the contributors list aswell.

### Contributors
* `Alexander Olsson <noseglid at gmail.com>`

[CanumbAtHeroku]: http://www.canumb.org
[ArbitraryPrecision]: http://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic
[EncodingBase64]: http://en.wikipedia.org/wiki/Base64
[EncodingUri]: http://en.wikipedia.org/wiki/Percent-encoding
[TLDR]: http://en.wikipedia.org/wiki/Wikipedia:Too_long;_didn't_read
[SinglePageApp]: http://singlepageappbook.com/
[EncodingBase85]: http://en.wikipedia.org/wiki/Ascii85
[SHA1]: http://en.wikipedia.org/wiki/Sha1
[SHA2]: http://en.wikipedia.org/wiki/SHA-2
[MDC2]: http://en.wikipedia.org/wiki/MDC2
[MD4]: http://en.wikipedia.org/wiki/Md4
[MD5]: http://en.wikipedia.org/wiki/Md5
[RIPEMD]: http://en.wikipedia.org/wiki/RIPEMD
[Whirlpool]: http://en.wikipedia.org/wiki/Whirlpool_(cryptography)
