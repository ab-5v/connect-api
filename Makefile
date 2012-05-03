test:
	npm install
	mocha --require should test/test.*.js
.PHONY: test
