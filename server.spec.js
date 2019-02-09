'use strict'

const expect = require('chai').expect;
const server = require('./server');

describe('server', () =>{
    it('have a listen call', ()=>{
        expect(server.port).to.be.a('number');
    });
});