import { findStore, createStore } from '../../services/table';

export const getMinifiedRecords = (records) => {
  return records.map((record) => ({
    recordId: record.id,
    ...record.fields,
  }));
};

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighborhood, address, imgUrl, voting } = req.body;
    const storeData = { id, name, neighborhood, address, imgUrl, voting };
    try {
      if (!id) return res.json({ message: 'id is missing' });
      const existingStore = await findStore(id);
      if (existingStore.length !== 0) {
        const records = getMinifiedRecords(existingStore);
        return res.json(records);
      } else {
        if (name && id) {
          const newStore = await createStore(storeData);
          const newStoreData = getMinifiedRecords(newStore);

          return res.json(newStoreData);
        } else {
          res.status(422);
          res.json({ message: 'Id or name are missing' });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: 'Error finding store', e });
    }
  } else {
    res.json({ message: 'this is a post route' });
  }
};
export default createCoffeeStore;
