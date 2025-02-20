const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Jasmine')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Jasmine');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
		.send({
			surname:"Colombo"
			})

        .end(function (err, res) {
          assert.equal(res.status,200,'response status should be 200');
		  assert.equal(res.type,'application/json','response should be json');
		  assert.equal(res.body.name,'Cristoforo','res.body.name should be Cristoforo');
		  assert.equal(res.body.surname,'Colombo','res.body.surname should be Colombo');

          done(); //don't forget to add 'done()'
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
		chai
			.request(server)
			.put('/travellers')
			.send({
				surname:"da Verrazzano"
			})
			.end(function(err,res) {
				assert.equal(res.status,200);
				assert.equal(res.type,'application/json');
				assert.equal(res.body.name,"Giovanni");
				assert. equal (res.body.surname,"da Verrazzano");
				
				done();
			})
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai.deedee25.repl.co'; // Your URL here: This is the test site we will be using.

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser();
/*This section of code sets up a headless browser by initializing a Browser object called browser. The suiteSetup below is then initialized in order to setup for tests. It will direct the browser to the / route. */
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo').then(() => {
      browser.pressButton('submit', () => {
      browser.assert.success();
      browser.assert.text('span#name', 'Cristoforo');
      browser.assert.text('span#surname', 'Colombo');
      browser.assert.elements('span#dates', 1);
      done();
        });
      });
    });
/*After the .pressButton function is called, we test the headless website is checked using the .assert functions, similar to the previous lessons.*/
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname','Vespucci').then(() => {
		browser.pressButton('submit',() => {
			browser.assert.success();
			broser.assert.text('span#name','Amerigo');
			browser.assert.text('span#surname','Vespucci');
			browser.assert.elements('span#dates', 1);
		});
	  });
    });
  });
});
