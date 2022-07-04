import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_PUBLIC_KEY,
});
export const getImages = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'cat',
    page: 1,
    perPage: 10,
    color: 'green',
    orientation: 'portrait',
  });
  return photos;
};
