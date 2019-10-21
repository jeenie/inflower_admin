export const userListMapper = list => list.map(item => userItemMapper(item));
const userItemMapper = item => ({
    ...item,
    id: item.user_id,
});