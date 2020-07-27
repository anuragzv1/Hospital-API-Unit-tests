let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Patient = require('../models/Patient');
let should = chai.should();
let app = require('../app');
chai.use(chaiHttp);

describe('Patient API', () => {
    //remove all patients from the collection before creating one
    before((done) => {
        Patient.deleteMany({}, (err) => {
            done();
        })
    });

    describe('/POST /patients/register', () => {
        it('Should create a new Patient in the collection', (done) => {
            chai.request(app)
                .post('/api/v1/doctors/login')
                .type('form')
                .send({
                    'username': 'test_doctor',
                    'password': 'test_password'
                })
                .end((req, res) => {
                    let token = res.body.token;
                    chai.request(app)
                        .post('/api/v1/patients/register')
                        .set({ "Authorization": `Bearer ${token}` })
                        .type('form')
                        .send({
                            'phone': '987654321'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.message.should.be.eql('New Patient Registered');
                            console.log(res.body);
                        });

                    done();
                });
        });
    });

});


