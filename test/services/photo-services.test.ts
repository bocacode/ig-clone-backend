import { getAllPhotos } from '../../src/services/photo-services';

describe('Photo Services', () => {
  it('should get all photos', async () => {
    const photos = await getAllPhotos();
    expect(photos.length).toBe(2);
  });
});
