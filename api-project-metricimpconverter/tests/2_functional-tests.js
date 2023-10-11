const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('Routing Tests to /api/convert', () => {
        test('Convert a valid input', (done) => {
            chai
            .request(server)
            .get('/api/convert')
            .query({input: '10L'})
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.initNum, 10);
              assert.equal(res.body.initUnit, 'L');
              assert.approximately(res.body.returnNum, 2.64172, 0.0001);
              assert.equal(res.body.returnUnit, 'gal');
              done();
            });
        });
        test('Convert an invalid input', (done) => {
            chai
            .request(server)
            .get('/api/convert')
            .query({input: '32g'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isNotTrue(res.body.initUnit);
                done();
            });
        });
        test('Convert an invalid number', (done) => {
            chai
            .request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kg'})
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isNotTrue(res.body.initNum);
                done();
            });
        });
        test('Convert an invalid number AND unit', (done) => {
            chai
            .request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isNotTrue(res.body.initNum);
                assert.isNotTrue(res.body.initUnit);
                done();
            })
        });
        test('Convert with no number', (done) => {
            chai
            .request(server)
            .get('/api/convert')
            .query({input: 'kg'})
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                assert.approximately(res.body.returnNum, 2.20462, 0.0001);
                assert.equal(res.body.returnUnit, 'lbs');
                done();
            });
        });
    });
});
