export const productListMapper = list => list.map(item => productItemMapper(item));
const productItemMapper = item => ({
    ...item,
    id: item.product_id,
});