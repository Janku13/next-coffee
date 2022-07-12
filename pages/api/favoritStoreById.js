import { findStore } from '../../services/table';
import { getMinifiedRecords } from './createCoffeStore';

const favoritStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;
    try {
      if (!id) res.json({ message: 'Store ID is missing' });
      const existingStore = await findStore(id);
      console.log(existingStore);
      if (existingStore.length !== 0) {
        const records = getMinifiedRecords(existingStore);
        console.log(records);
        return res.json(records);
      }
    } catch (e) {
      res.status(500).json({ message: 'error favourting' });
    }
  } else {
    res.status(405);
    res.json({ message: 'this is a put route' });
  }
};

export default favoritStoreById;
