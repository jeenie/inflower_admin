export const missionListMapper = list => list.map(item => missionItemMapper(item));
const missionItemMapper = item => ({
    ...item,
    id: item.influencer_mission_id,
});