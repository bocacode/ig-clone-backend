import { db } from '../db/db';
import { Photo } from '../models/photo';
import { ObjectId } from 'mongodb';

interface PhotoServices {
  getAllPhotos(): Promise<Photo[]>;
  createPhoto(photo: Photo): Promise<string>;
  updatePhoto(id: string, photo: Photo): Promise<Photo>;
  addComment(id: string, comment: string): Promise<Photo>;
  updateLikes(id: string, inc: number): Promise<Photo>;
}

const photoCollection = db.collection<Photo>('photos');

export const getAllPhotos = async (): Promise<Photo[]> => {
  const photos = await photoCollection.find().toArray();
  return photos;
};

export const createPhoto = async (photo: Photo): Promise<string> => {
  const res = await photoCollection.insertOne(photo);
  return res.insertedId.toString();
};

export const updatePhoto = async (id: string, photo: Photo): Promise<Photo> => {
  const res = await photoCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...photo } }
  );
  const updatedPhoto = res.value as Photo;
  updatedPhoto.id = res.value?._id.toString();
  return updatedPhoto;
};

export const addComment = async (
  id: string,
  comment: string
): Promise<Photo> => {
  const res = await photoCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $push: { comments: comment } }
  );

  const updatedPhoto = res.value as Photo;
  updatedPhoto.id = res.value?._id.toString();
  return updatedPhoto;
};

export const updateLikes = async (
  id: string,
  inc: number = 1
): Promise<Photo> => {
  console.log('likes', inc);
  const res = await photoCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { likes: inc } }
  );

  const updatedPhoto = res.value as Photo;
  updatedPhoto.likes += inc;
  updatedPhoto.id = res.value?._id.toString();
  return updatedPhoto;
};

export const photoServices: PhotoServices = {
  getAllPhotos,
  createPhoto,
  updatePhoto,
  addComment,
  updateLikes,
};
