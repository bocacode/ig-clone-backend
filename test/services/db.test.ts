import { MongoClient } from 'mongodb';
import { uri } from '../../credentials';

fdescribe('insert', () => {
  let connection: any;
  let db: any;

  beforeAll(async () => {
    connection = await MongoClient.connect(uri);
    db = connection.db('test');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});
