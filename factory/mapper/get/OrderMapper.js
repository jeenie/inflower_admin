export const orderListMapper = list => list.map(item => orderItemMapper(item));
const orderItemMapper = item => ({
    ...item,
    id: item.influencer_order_id,
});