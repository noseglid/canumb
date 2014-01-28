#!/bin/sh

npm install
./node_modules/.bin/grunt heroku
foreman start
