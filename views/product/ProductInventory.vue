<template>
  <Content>
    <h1 class="sub_title">상품 리스트 <router-link to="/product/create" tag="button" class="addBtn">상품추가</router-link></h1>
    <List :list="productList" :columns="columns" :url="'\/product\/'" />
  </Content>
</template>

<script>
import Content from '@/components/content/Content'
import List from '@/components/list/PaginatedList'

import { findProductList } from "../../api/admin";

const columns = [
    {
      "id": "product_id",
      "column": "번호"
    } ,
    {
      "id": "product_is_visible",
      "column": "visible"
    },
    {
      "id": "category",
      "column": "카테고리"
    },
    {
      "id": "product_name",
      "column": "상품명"
    } ,
    {
      "id": "price",
      "column": "원가"
    } ,
    {
      "id": "sale",
      "column": "현재신청수량"
    } ,
    {
      "id": "sale_price",
      "column": "최소주문수량"
    } ,
    {
      "id": "product_created_at",
      "column": "생성일"
    }
];

export default {
  name: 'product',
  components: {
    Content,
    List
  },
  data() {
    return {
      columns,
      productList: []
    }
  },
  mounted() {
    findProductList().then(list => {
      this.productList = list;
    });
  }
}
</script>

<style scoped>
table {
  width:90%;
  height:100%;
  margin: 0 5%;
  border-collapse: collapse;
  font-family: SourceHanSansKR;
  text-align: left;
  color: #3c3c3b;
}

th, td {
  border-bottom: solid 0.5px #b3b3b3;
  padding: 20px 15px;
}

th {
  font-size: 14px;
}

td {
  font-size: 13px;
  font-weight: normal;
}

.orderList {
  margin: 56px 170px 190px 170px;
  border: solid 0.5px #b3b3b3;
  background-color: #ffffff;
}

.sub_title {
  font-family: SourceHanSansKR;
  font-size: 25px;
  line-height: 1.4;
  text-align: left;
  color: #3c3c3b;
  margin: 50px 0 40px 80px;
}

.addBtn {
  border-radius: 1.5px;
  border: solid 0.5px #333333;
  background-color: #333333;
  font-family: SourceHanSansKR;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.18;
  letter-spacing: -0.56px;
  text-align: left;
  color: #ffffff;
  float: right;
  padding: 4px 30px;
  margin-right: 70px;
}

.pagination {
  margin: 1.5rem 0;
  text-align: center;
}

.pageBtn {
  width: 38px;
  height: 36px;
  border: solid 0.5px #dddddd;
  background-color: #ffffff;
  color: #808080;
}

.pagination .pageCount {
  padding: 0.1em;
}

.disbled {
  display: none;
}

.active {
  border: solid 0.5px #8f0000;
  background-color: #8f0000;
  color: #ffffff;
}
</style>
