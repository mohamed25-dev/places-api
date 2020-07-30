const supertest = require('supertest');

const http = require('http');
const fs = require('fs');
const db = require('../models/index');
const app = require('../startup/app');

describe('/api/places', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    db.sequelize.close();
    server.close(done);

    done();
  });

  describe('GET /', () => {
    it('Should return all places', async () => {
      const res = await request.get('/api/places');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('places');
    });

    it('Should return the place with id 1', async () => {
      const res = await request.get('/api/places/1');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('place');
    });

    it('Should return 404 "Place not found "', async () => {
      const res = await request.get('/api/places/3');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('Should create a new place', async () => {
      const res =  await request
        .post('/api/places')
        .field('placeName', 'Home2')
        .field('placeLocation', 'SomeWhere')
        .attach('placeImages', 'test/home-test.jpg');

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('place');
    });

    it('Should return 400 bad request " name already exist" ', async () => {
      const res =  await request
        .post('/api/places')
        .field('placeName', 'Home')
        .field('placeLocation', 'SomeWhere')
        .attach('placeImages', 'test/home-test.jpg');

      expect(res.status).toBe(400);
    });

    it('Should return 400 bad request "placeName" is required ', async () => {
      const res =  await request
        .post('/api/places')
        .attach('placeImages', 'test/home-test.jpg');

      expect(res.status).toBe(400);
    });
  });
});