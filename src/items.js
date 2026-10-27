// dummy mock data
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 6, name: 'Item 6'},
  {id: 8, name: 'Item 8'},
];

const getItemById = (id) => {
    // TODO: return correct json object based on id
    return {name: 'not done yet'};
};

const getItems = (limit) => {
    // TODO: return all items by default, use limit if defined
};

export default items;
export {getItemById, getItems};