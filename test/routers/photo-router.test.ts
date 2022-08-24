import app from '../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('photo routes', () => {
  beforeEach(() => {});

  describe('POST /photos', () => {
    it('it should create a photo', async () => {
      //Arrange and Act
      const response = await request
        .post('/photos')
        .send({})
        // .send({ photoUrl: 'awesome-test-url.com' })
        .set('Accept', 'application/json');

      //Assert
      expect(response.status).toBe(400);
    });
  });
});
