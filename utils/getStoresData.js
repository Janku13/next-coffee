import { getImages } from './unsplashImages';

function setUrl(query, limit) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=43.653833032607096%2C-79.37896808855945&limit=${limit}`;
}

export async function getStoresData() {
  const FOUR_URL = setUrl('Coffee', 6);
  const photos = await getImages('coffee shop', 1, 10);
  const imgs = photos.map((result) => result.urls['small']);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  try {
    const response = await fetch(FOUR_URL, options);
    const data = await response.json();

    return data.results.map((result, idx) => {
      const neighborhood = result.location.neighborhood;
      return {
        ...result,
        id: result.fsq_id,
        address: result.location.address,
        neighborhood:
          neighborhood?.length > 0
            ? neighborhood[0]
            : result.location.formatted_address,
        name: result.name,
        imgUrl: imgs.length > 0 ? imgs[idx] : null,
      };
    });
  } catch (e) {
    console.log(e);
  }
}
