import { findStore } from '../../services/table';
import { getMinifiedRecords } from './createCoffeStore';

const getStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) res.json({ message: 'Store ID is missing' });
    const existingStore = await findStore(id);

    if (existingStore.length !== 0) {
      const records = getMinifiedRecords(existingStore);

      return res.json(records);
    } else {
      res.json({ message: 'did not find the id' });
    }
  } catch (e) {
    res.status(500);
    res.json({ message: 'Could not get store', e });
  }
};

export default getStoreById;
