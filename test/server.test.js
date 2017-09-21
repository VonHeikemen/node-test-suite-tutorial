const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

var server = require('../server.js');

describe('Testing return values', () => {

    it('should return a simple string', (done) => {

        request(server.app)
            .get('/hello-express')
            .expect(200)
            .expect('Hello Express!')
            .end(done)
        ;

    });

    it('should return an array of objects', (done) => {

        request(server.app)
            .get('/array-objects')
            .expect(200)
            .expect((res) => {
                expect(res.body)
                    .to.be.an('array')
                    .to.deep.include({number:2});
            })
            .end(done)
        ;

    });

});

describe('Testing nested properties', () => {

    it('should have nested property', (done) => {

        request(server.app)
            .get('/array-objects')
            .expect(200)
            .expect((res) => {
                // I don't know about this. There has to be a better way
                expect(res.body)
                    .to.be.an('array')
                    .to.have.own.property(0)
                    .which.has.own.property('_type1_')
                    .that.is.a('string')
                    .that.is.equal('integer')
                ;
            })
            .end(done)
        ;

    });

    it('should have nested property [another way]', (done) => {

        request(server.app)
            .get('/array-objects')
            .expect(200)
            .expect((res) => {
                //I wouldn't say better, but it's okay
                expect(res.body)
                    .to.be.an('array')
                    .to.have.nested.property('[0]._type1_')
                    .that.is.a('string')
                    .to.be.equal('integer')
                ;
            })
            .end(done)
        ;

    });

});

