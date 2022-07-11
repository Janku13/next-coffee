import { getStoresData } from '../../utils/getStoresData';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await getStoresData(latLong, limit);
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Oh no!', e });
  }
};

export default getCoffeeStoresByLocation;
