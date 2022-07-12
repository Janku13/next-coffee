const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

export const findStore = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id=${id}`,
    })
    .firstPage();
  return findCoffeeStoreRecords;
};

export const createStore = async (coffeStoreData) => {
  console.log(coffeStoreData);
  const data = await table.create([{ fields: coffeStoreData }]);
  return data;
};
