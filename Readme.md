# Nightmare / Nightwatch spike

A spike to figure out a testing tool direction. After setting each of these up I
created a single test scenario around performing a few different searches. This
is similar to our [existing integration test for the search container](https://github.com/ello/webapp/blob/master/test/integration/containers/Search_test.js).

## Nightmare

[Nightmare][nightmare] is a browser automation tool and wrapper around
[phantom.js][phantom]. It plays really well with [mocha][mocha]. Especially
[mocha generators][mocha-generators] coupled with [nightmare's page
extractions](https://github.com/segmentio/nightmare#extract-from-the-page) and
[evaluate](https://github.com/segmentio/nightmare#evaluatefn-arg1-arg2)
function.

To run the [Nightmare][nightmare] tests

```javascript
cd nightmare/
npm install
npm test
```

### Pros
- simple API
- modular
- mocha integration
- [test examples](https://github.com/segmentio/nightmare/blob/master/test/index.js)

### Cons
- documentation
- generators can be a little verbose
- sauce labs integration?

+8200 Github stars

## Nightwatch

[Nightwatch][nightwatch] is an all in one browser automation and testing tool
built on top of [selenium][selenium]. It utilizes it's own set of
expectations/assertion (though [mocha][mocha] can be used) and is well
documented.

To run the [Nightwatch][nightwatch] tests

```javascript
cd nightwatch/
npm install
npm test
```

There is a `postinstall` hook for nightwatch to install selenium and
chromedriver. It was a little funky for me but should be setup and ready to
roll.

+8200 Github stars

### Pros
- Well documented
- selenium
- succinct
- sauce labs integration

### Cons
- Expectations/assert are half baked (had to use both?)
- Custom mocha integration isn't fully there either
- Couldn't figure out how to get at some basic objects to test
- seems like it's mainly a single individual vs organization

+4700 stars

[mocha-generators]: https://github.com/vdemedes/mocha-generators
[mocha]: http://mochajs.org
[nightmare]: https://github.com/segmentio/nightmare
[nightwatch]: http://nightwatchjs.org
[phantom]: http://phantomjs.org
[ruby-e2e]: https://github.com/ello/integration-tests
[selenium]: http://docs.seleniumhq.org 


