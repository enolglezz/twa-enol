//byCategory(list, cat)
export const byCategory = (list, cat) => 
  list.filter(item => item.category === cat);

//search(list, text)
export const search = (list, text) => {
  const query = text.toLowerCase();
  return list.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.tags.some(tag => tag.toLowerCase().includes(query))
  );
};

//total(list)
export const total = (list) => 
  list.reduce((acc, item) => acc + item.price, 0);

//top(list, n)
export const top = (list, n) => 
  list.toSorted((a, b) => b.price - a.price).slice(0, n);

//categories(list)
export const categories = (list) => 
  [...new Set(list.map(item => item.category))].toSorted();

//withDiscount(list, pct)
export const withDiscount = (list, pct) => 
  list.map(item => ({
    ...item,
    price: item.price * (1 - pct / 100)
  }));

