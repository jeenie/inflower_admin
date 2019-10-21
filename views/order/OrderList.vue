<template>
  <Content>
    <h1 class="sub_title">주문 리스트</h1>
    <List :list="orderList" :columns="checkVersion" :url="'\/order\/'" />
  </Content>
</template>

<script>
import store from '@/store/store'
import Content from '@/components/content/Content'
import List from '@/components/list/PaginatedList'

import { findB2BOrderList } from "../../api/admin";

const b2bColumns = [
  {
    "id": "influencer_order_id",
    "column": "번호"
  },
  {
    "id": "orderName",
    "column": "주문자"
  },
  {
    "id": "product_name",
    "column": "상품명"
  },
  {
    "id": "price",
    "column": "연락처"
  } ,
  {
    "id": "price",
    "column": "합계금액"
  },
  {
    "id": "sale_price",
    "column": "미션승인"
  } ,
  {
    "id": "orderStatus",
    "column": "베송상태"
  } ,
  {
    "id": "orderStatus",
    "column": "주문상태"
  },
  {
    "id": "orderCreatedAt",
    "column": "주문잁"
  }
];

const b2cColumns = [
  {
    "id": "product_id",
    "column": "번호"
  },
  {
    "id": "category",
    "column": "주문자"
  },
  {
    "id": "product_name",
    "column": "상품명"
  },
  {
    "id": "price",
    "column": "연락처"
  } ,
  {
    "id": "sale",
    "column": "합계금액"
  } ,
  {
    "id": "sale_price",
    "column": "베송상태"
  } ,
  {
    "id": "product_created_at",
    "column": "주문상태"
  },
  {
    "id": "product_created_at",
    "column": "주문잁"
  }
];

export default {
  components: {
    Content,
    List
  },
  data() {
    return {
      columns: [],
      orderList: []
    }
  },
  computed: {
    checkVersion() {
      if(store.state.version === 'b2b')
        return b2bColumns;
      else if(store.state.version === 'b2c')
        return b2cColumns;
    }
  },
  mounted() {
    if(store.state.version === 'b2b') {
      findB2BOrderList().then(list => {
        this.orderList = list;
      });
    }
  }
}
</script>

<style scoped>
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
</style>
