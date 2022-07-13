import { findStore, updateStoreVotes } from '../../services/table';
import { getMinifiedRecords } from './createCoffeStore';

const favoritStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;
    try {
      if (!id) res.json({ message: 'Store ID is missing' });
      const existingStore = await findStore(id);
      if (existingStore.length !== 0) {
        const records = getMinifiedRecords(existingStore);
        const record = records[0];
        const calculateVoting = parseInt(record.voting) + 1;

        const data = await updateStoreVotes(record, calculateVoting);
        if (data) {
          const minifiedData = getMinifiedRecords(data);
          return res.json(minifiedData);
        }
      } else {
        res.json({ message: 'coffee store id does not exist', id });
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
