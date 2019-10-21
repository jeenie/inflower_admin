<template>
  <Content>
    <h1 class="sub_title">
      상품 상세 조회
      <router-link :to="productEditPath" tag="button" class="editBtn">상품 수정</router-link>
    </h1>
    <div>
      <button @click="setProductVisible">앱에 상품 보이게 하기</button>
      <button @click="setProductHidden">앱에 상품 숨기기</button>
    </div>
    <div class="product_detail">
      <div class="img_list">
        <div v-for="(url, index) in productImgList" :key="url+index" class="img_item">
          <youtube v-if="isYoutube(url)" :video-id="getYoutubeVideoId(url)" ref="youtube"></youtube>
          <img v-else :src="url" />
        </div>
      </div>
      <div class="product_attr">
        <label class="attr_name">상품번호</label>
        <input v-model="product.product_id" class="attr" placeholder="상품번호" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">카테고리</label>
        <input v-model="product.category" class="attr" placeholder="카테고리" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">상품명</label>
        <input v-model="product.product_name" class="attr" placeholder="상품명" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">원가</label>
        <input v-model="product.price" class="attr" placeholder="원가" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">현재신청수량</label>
        <input v-model="product.sale" class="attr" placeholder="현재신청수량" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">최소주문수량</label>
        <input v-model="product.sale" class="attr" placeholder="최소주문수량" readonly />
      </div>
      <div class="product_attr">
        <label class="attr_name">쇼피 링크</label>
        <textarea v-model="product.shop_link" class="attr" placeholder="쇼피 링크" readonly />
      </div>
      <label class="attr_name">상품설명</label>
      <div v-html="product.content" class="product_content"></div>
    </div>
  </Content>
</template>

<script>
import axios from "axios";
import Content from "@/components/content/Content";
import {
  findProductById,
  putProductVisible,
  putProductHidden
} from "../../api/admin";
import { isYoutube, getYoutubeVideoId } from '../../utils/url';

export default {
  name: "product_detail",
  components: {
    Content
  },
  data() {
    return {
      array: [],
      product: {},
      proImgSrc: '',
      productImgList: [],
    }
  },
  computed: {
    productId() {
      return Number(this.$route.params.productId);
    },
    productEditPath(){
      return '/product/' + this.productId + '/edit';
    }
  },
  methods: {
    isYoutube,
    getYoutubeVideoId,
    setProductVisible() {
      putProductVisible(this.productId);
      alert('변경했습니다');
    },
    setProductHidden() {
      putProductHidden(this.productId);
      alert('변경했습니다');
    },
  },
  mounted() {
    findProductById(this.productId).then(([data]) => {
      this.product = data;
      this.productImgList = JSON.parse(data.productImgList);
    });
  },
}
</script>

<style lang="scss" scoped>
table {
  width:90%;
  height:100%;
  margin: 0 5%;
  border-collapse: collapse;
  font-family: SourceHanSansKR;
  text-align: left;
  color: #3c3c3b;
}

th,
td {
  border-bottom: solid 0.5px #b3b3b3;
  padding: 20px 15px;
}

th {
  font-size: 17px;
}

td {
  font-size: 14px;
  font-weight: normal;
}

label {
  font-family: SourceHanSansKR;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.18;
  letter-spacing: -0.56px;
  text-align: left;
  color: #3c3c3b;
  margin-right: 78px;
}

.content {
  height: 3132.1px;
}

.sub_title {
  font-family: SourceHanSansKR;
  font-size: 25px;
  line-height: 1.4;
  text-align: left;
  color: #3c3c3b;
  margin: 50px 0 20px 80px;
}

.editBtn {
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
.img_list {
  margin: 0 75px 80px 0;
  display: flex;
  flex-flow: row wrap;
}

.img_item {
  margin-right: 4%;
}

.img_item > img {
  width: 220.6px;
  height: 220.6px;
}

.product_detail {
  margin-left: 80px;
  text-align: left;
}

.product_attr {
  margin: 0 80px 20px 0;
  display: flex;
}

.attr_name {
  margin: 15px 55px 20px 0;
  width: 20%;
}

.attr {
  width: 80%;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #fafafa;
  float: right;
  padding: 15px 3px;
  margin: 0 80px 20px 0;
}

.attr_text {
  width: 100%;
  height: 235.5px;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #fafafa;
  resize: none;
  float: right;
  margin: 0 80px 20px 0;
}

.product_account {
  display: block;
}

.product_content {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
  }

  p {
    margin: 0;
  }
}
</style>
