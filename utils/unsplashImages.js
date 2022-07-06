import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_PUBLIC_KEY,
});
export const getImages = async (name, page, perPage) => {
  const photos = await unsplash.search.getPhotos({
    query: name,
    page: page,
    perPage: perPage,
  });
  return photos.response.results;
};
