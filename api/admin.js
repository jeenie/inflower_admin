import Request from './Request';
import { productListMapper } from "../factory/mapper/get/ProductMapper";
import { boardListMapper } from "../factory/mapper/get/BoardMapper";
import { missionListMapper } from "../factory/mapper/get/MissionMapper";
import { orderListMapper } from "../factory/mapper/get/OrderMapper";
import { userListMapper} from "../factory/mapper/get/UserMapper";


const isDev = process.env.NODE_ENV === 'production';

const AdminBaseURL = `https://${isDev ? 'test' : 'prod'}.api.in-flower.com/${process.env.VUE_APP_LOCALE}/admin`;
export const AdminRequest = new Request(AdminBaseURL);
export const AdminB2CRequest = new Request(`${AdminBaseURL}/b2c`);
export const AdminB2BRequest = new Request(`${AdminBaseURL}/b2b`);

export const uploadFile = (file) => AdminRequest.postFile('upload/create', file);

export const findB2BOrderList = () => AdminB2BRequest.get('order/list').then(res => (orderListMapper(res)));
export const findB2BOrderByInfluencerOrderId = id => AdminB2BRequest.get('order/' + id);

export const findProductList = () => AdminB2CRequest.get('product/list').then(res => (productListMapper(res)));
export const findProductById = id => AdminB2CRequest.get('product/' + id);
export const putProductVisible = product_id => AdminB2CRequest.put('product/status/visible', { product_id });
export const putProductHidden = product_id => AdminB2CRequest.put('product/status/hidden', { product_id });

export const putProductUpdate = (product) => AdminB2CRequest.put('product/update', product)

export const findMissionList = () => AdminB2BRequest.get('mission/list').then(res => (missionListMapper(res)));
export const findMissionByInfluencerMissionId = id => AdminB2BRequest.get('mission/info/' + id);

export const findB2CUserList = () => AdminB2CRequest.get('user/list').then(res => (userListMapper(res)));
export const findB2CUserById = id => AdminB2CRequest.get('user/' + id);

export const findNoticeList = () => AdminB2BRequest.get('notice').then(res => (boardListMapper(res)));
export const findEventList = () => AdminB2CRequest.get('event').then(res => (boardListMapper(res)));

export const postBoard = (type, body) => AdminRequest.post(`${type}/create`, body);
export const postProduct = (product) => AdminB2CRequest.post('product/create', product);
