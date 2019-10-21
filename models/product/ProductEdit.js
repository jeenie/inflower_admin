export default class ProductEdit {
    constructor(product_id, product_name, price, unit, sale, sale_price, country_code, content, category, shop_link, imgUrl_list, admin_use) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.price = price;
        this.unit = unit;
        this.sale = sale;
        this.sale_price = sale_price;
        this.country_code = country_code;
        this.content = content;
        this.category = category;
        this.shop_link = shop_link;
        this.imgUrl_list = imgUrl_list;
        this.admin_use = admin_use;
    }
}
