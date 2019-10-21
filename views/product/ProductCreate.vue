<template>
<div class="content">
  <h1 class="sub_title">상품 {{ modeText }}</h1>
  <div class="product_detail">
    <div class="product_attr">
      <label class="attr_name">대표 섬네일</label>
      <input
        type="file"
        ref="file"
        class="addFile"
        @change="handleMainThumbUpload"
      />
    </div>
    <div class="product_attr">
      <label class="attr_name">섬네일 추가</label>
      <input type="file" class="addFile" @change="handleAddThumb"/>
    </div>
    <div class="product_attr">
      <input type="text" v-model="thumbnailURL" class="add-url" placeholder="url 직접입력 (https://youtube.com/...)"/><button @click="handleAddThumbURL">추가</button>
    </div>
    <div style="display: flex; flex-flow: row wrap; margin: 20px 0;">
      <div v-for="(url, index) in imgList" :key="url + index">
        <youtube v-if="isYoutube(url)" :video-id="getYoutubeVideoId(url)" ref="youtube"></youtube>
        <img v-else :src="url" style="width: 200px; height: 200px; object-fit: cover;"/>
        <button @click="onClickDeleteImage(url)">삭제</button>
      </div>
    </div>
    <div class="product_attr">
      <label class="attr_name">카테고리</label>
      <select v-model="category" class="category">
        <option disabled value="">카테고리</option>
        <option>makeup</option>
        <option>skincare</option>
        <option>etc</option>
      </select>
    </div>
    <div class="product_attr">
      <div>Feed에서는 안보이게 할까요? =>&nbsp;</div>
      <input type="checkbox" v-model="isInvisibleInFeed"/>
    </div>
    <br/>
    <div class="product_attr">
      <label class="attr_name">상품명</label>
      <input v-model="productName" class="attr" placeholder="상품명"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">가격단위</label>
      <input v-model="unit" class="attr" placeholder="가격단위"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">원가</label>
      <input v-model="price" class="attr" placeholder="원가"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">할인율</label>
      <input @input="onChangeSale" :value="sale" class="attr" placeholder="할인율(현재 소수입력x)"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">판매가</label>
      <input v-model="salePrice" class="attr" placeholder="판매가"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">쇼피 링크</label>
      <input v-model="shopLink" class="attr" placeholder="쇼피 링크"/>
    </div>
    <div>
      <vue-editor
              v-model="detailContent"
              :editorToolbar="EDITOR_TOOLBAR"
              useCustomImageHandler
              @imageAdded="handleDetailImageChange"
              style="margin-top: 10px;"
              id="create-editor"
      >
      </vue-editor>
    </div>
    <!-- <div class="product_attr">
      <label class="attr_name">현재신청수량</label>
      <input class="attr" placeholder="현재신청수량" disabled="true"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">최소주문수량</label>
      <input class="attr" placeholder="최소주문수량" disabled="true"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">옵션생성</label>
      <button
        @click="addOption"
        class="add_option"
      >
        옵션 추가
      </button>
      <component v-for="item in options" :is="item"></component>
    </div> -->
    <!-- <div class="product_attr">
      <label class="attr_name">상품설명</label> -->
      <!-- <img v-bind:src="proImgSrc"/> -->
    <!-- </div> -->
    <div class="bottom">
      <button class="createBtn" @click="createProduct">상품 {{ modeText }}</button>
      <button class="cancel">취소</button>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import {VueEditor} from 'vue2-editor';

import Product from '@/models/product/ProductModel.js'
import ProductEdit from '@/models/product/ProductEdit.js'
import Content from '@/components/content/Content'
import Option from '@/components/product/Option'

import {isYoutube, getYoutubeVideoId} from '../../utils/url';
import {postProduct, putProductUpdate} from "../../api/admin"
import { uploadFile } from "../../api/admin";
import { findProductById } from '../../api/admin';



const EDITOR_TOOLBAR = [
  [{'size': ['small', 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6]}],
  ['bold', 'italic', 'underline', 'strike'],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'align': []}],['image']
];

export default {
  components: {
    VueEditor,
    Content,
    Product,
    Option
  },
  data() {
    return {
      EDITOR_TOOLBAR,
      file: '',
      thumbnailURL: '',
      thumbnailList: '',
      category: '',
      isInvisibleInFeed: false,
      productName: '',
      unit: '$',
      price: '',
      sale: '',
      salePrice: '',
      options: [],
      array: [],
      product: {},
      proImgSrc: '',
      shopLink: '',
      imgList: [],
      detailContent: '',
    }
  },
  computed: {
    productId() {
      return Number(this.$route.params.productId);
    },
    checkEditMode() {
      return this.$route.params.mode === 'edit';
    },
    modeText() {
      return this.checkEditMode ? '수정' : '추가';
    },
    isInvisibleInFeedVal() {
      return this.isInvisibleInFeed ? 1 : 0;
    }
  },
  methods: {
    isYoutube,
    getYoutubeVideoId,
    addOption() {
      this.options.push('Option');
    },
    handleMainThumbUpload(event) {
      const file = event.target.files[0];
      uploadFile(file).then(imgSrc => {
        this.imgList = [imgSrc, ...this.imgList];
      });
    },
    handleAddThumb(e) {
      const file = e.target.files[0];
      uploadFile(file).then(imgSrc => {
        this.imgList = [...this.imgList, imgSrc];
      });
    },
    handleAddThumbURL() {
      const newUrl = this.thumbnailURL.trim();
      if(newUrl.includes('http')) {
        this.imgList = [...this.imgList, this.thumbnailURL.trim()];
        this.thumbnailURL = '';
      } else {
        alert('must includes "http"');
      }
    },
    onClickDeleteImage(deleteImageUrl) {
      this.imgList = this.imgList.filter(imgUrl => imgUrl !== deleteImageUrl);
    },
    onChangeSale({target}) {
      const {value} = target;
      const v = parseFloat(value) / 100;
      this.sale = value;
      this.salePrice = Number((this.price * (1 - v)).toFixed(2));
    },
    handleDetailImageChange(file, Editor, cursorLocation, resetUploader) {
      uploadFile(file).then(imgSrc => {
        Editor.insertEmbed(cursorLocation, "image", imgSrc);
        resetUploader();
      });
    },
    createProduct() {
      if(this.checkEditMode) {
        putProductUpdate(new ProductEdit(this.productId, this.productName, Number(this.price),
                this.unit, this.sale, this.salePrice, 'sg', this.detailContent, this.category, this.shopLink, this.imgList, this.isInvisibleInFeedVal))
        // axios.put('/product/update', new ProductEdit(this.productId, this.productName, Number(this.price),
        //         this.unit, this.sale, this.salePrice, 'sg', this.detailContent, this.category, this.shopLink, this.imgList, this.isInvisibleInFeedVal))
                .then(function () {
                  alert('상품 수정 성공');
                }).catch(function () {
                  alert('상품 수정 실패')
                });
      } else {
        postProduct(new Product('admin_id', this.productName, Number(this.price),
                this.unit, this.sale, this.salePrice, 'sg', this.detailContent, this.category, this.shopLink, this.imgList, this.isInvisibleInFeedVal))
        // axios.post('/product/create', new Product('admin_id', this.productName, Number(this.price),
        //         this.unit, this.sale, this.salePrice, 'sg', this.detailContent, this.category, this.shopLink, this.imgList, this.isInvisibleInFeedVal))
                .then(function() {
                  alert('상품 등록 성공');
                })
                .catch(function() {
                  alert('상품 등록 실패');
                });
      }
    },
  },
  mounted() {
    this.checkEditMode && findProductById(this.productId).then(([data]) => {
      this.product = data;
      this.productName = data.product_name;
      this.category = data.category;
      this.price = data.price;
      this.sale = data.sale;
      this.salePrice = data.sale_price;
      this.shopLink = data.shop_link;
      this.detailContent = data.content;
      this.imgList = JSON.parse(data.productImgList);
      this.isInvisibleInFeed = data.admin_use;
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
  margin-right: 78px
}

input {
  font-size: 16px;
}

.content {
  display: flex;
  flex-flow: column wrap;
  margin: 56px 170px 0 170px;
  border: solid 0.5px #b3b3b3;
  background-color: #ffffff;
}

.sub_title {
  font-family: SourceHanSansKR;
  font-size: 25px;
  line-height: 1.4;
  text-align: left;
  color: #3c3c3b;
  margin: 50px 0 20px 80px;
}

.addFile {
  padding: 15px 0 15px 10px;
  margin: 3px 80px 0 0;
}

.add-url {
  width: 400px;
}

.category {
  width: 281.4px;
  height: 48px;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #ffffff;
  margin: 3px 0 20px 0;
}

.add_option {
  font-family: SourceHanSansKR;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.94;
  border-radius: 3px;
  border: solid 0.5px #333333;
  background-color: #333333;
  color: #ffffff;
  padding: 10px 40px;
  margin-left: 30px;
}

.img_list {
  margin: 0 75px 80px 0;
  display: flex;
  justify-content: space-between;
}

.img_item {
  margin-right: 4%;
}

.img_item > img {
  width: 220.6px;
  height: 220.6px;
}

.product_detail {
  display: flex;
  flex-flow: column wrap;
  margin: 0 40px;
}

.product_attr {
  display: flex;
}

.attr_name {
  width: 100px;
  margin-right: 15px;
}

.attr {
  width: 762.6px;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #ffffff;
  float: right;
  padding: 15px 0 15px 10px;
  margin: 3px 80px 20px 0;
}

.quillWrapper {
  height: 500px;
  margin-bottom: 100px;
}

.attr_text {
  width: 762.6px;
  height: 235.5px;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #fafafa;
  resize: none;
  float: right;
  margin: 0 80px 20px 45px;
}

.product_account {
  display: block;
}

.bottom {
  float: left;
}

.createBtn {
  width: 144px;
  height: 46px;
  font-family: SourceHanSansKR;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.18;
  border-radius: 3px;
  border: solid 0.5px #333333;
  background-color: #333333;
  color: #ffffff;
  padding: 6px 35px;
}

.cancel {
  width: 144px;
  height: 46px;
  font-family: SourceHanSansKR;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.18;
  border-radius: 3px;
  border: solid 0.5px #bfbfbf;
  background-color: #f2f2f2;
  color: #3c3c3b;
  padding: 6px 35px;
  margin: 0 7px 20px 0;
}
</style>
