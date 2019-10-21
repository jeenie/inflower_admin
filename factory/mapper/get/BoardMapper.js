export const boardListMapper = list => list.map(item => boardItemMapper(item));

const boardItemMapper = item => ({
    ...item,
    id: item.board_no,
});