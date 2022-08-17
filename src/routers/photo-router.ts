import { Router } from 'express';
import { photoServices } from '../services/photo-services';

export const photoRouter = Router();

photoRouter.get('/', async (req, res) => {
  const photos = await photoServices.getAllPhotos();
  res.status(200).json(photos);
});

photoRouter.post('/', async (req, res) => {
  const { photoUrl, description } = req.body;

  if (!photoUrl) {
    res.status(400).json({ message: 'photoUrl is required' });
    return;
  }
  const photo = {
    photoUrl,
    comments: [],
    likes: 0,
    description,
  };
  const id = await photoServices.createPhoto(photo);

  const createdPhoto = { id, ...photo };

  res.status(201).json(createdPhoto);
});

photoRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  const photo = await photoServices.updateLikes(id, likes as number);
  res.status(200).json(photo);
});
