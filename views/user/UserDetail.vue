<template>
    <Content>
        <h1 class="sub_title"> 회원 상세 조회 </h1>
        <div class="order_detail">
            <div class="product_attr">
                <label class="attr_name">번호</label>
                <input v-model="user.user_id" class="attr" placeholder="상품번호" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">이메일</label>
                <input v-model="user.user_email" class="attr"  placeholder="-" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">아이디</label>
                <input v-model="user.user_name" class="attr" placeholder="상품명" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">연락처</label>
                <input class="attr" placeholder="연락처" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">주소</label>
                <input class="address_number attr" placeholder="우편번호" readonly />
            </div>
            <div class="product_attr">
                <input class="address attr" placeholder="기본주소" readonly />
            </div>
            <div class="product_attr">
                <input class="address attr" placeholder="상세주소" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">프로필사진</label>
                <img src="../../assets/profile.png"/>
            </div>
            <div class="product_attr">
                <label class="attr_name">최근접속일</label>
                <input v-model="user.user_created_at" class="attr" placeholder="-" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">최근구매일</label>
                <input v-model="user.user_created_at" class="attr" placeholder="-" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">가입일</label>
                <input v-model="user.user_created_at" class="attr" placeholder="-" readonly />
            </div>
        </div>
    </Content>
</template>

<script>
    import Content from "@/components/content/Content";
    import { findB2CUserById } from "../../api/admin";
    import { isYoutube, getYoutubeVideoId } from '../../utils/url';

    export default {
        components: {
            Content
        },
        data() {
            return {
                array: [],
                user: {},
                orderStatus: '',
                productImgList: []
            }
        },
        computed: {
            userId() {
                return Number(this.$route.params.userId);
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
            findB2CUserById(this.userId).then(([data]) => {
                this.user = data;
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
        height: 1100px;
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

    .order_detail {
        margin-left: 80px;
        text-align: left;
    }

    .product_attr {
        margin: 0 80px 10px 0;
        display: flex;
    }

    .attr_name {
        margin: 10px 30px 25px 0;
        width: 7%;
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

    .attr_mission {
        width: 40%;
        border-radius: 3px;
        border: solid 0.5px #dddddd;
        background-color: #fafafa;
        float: right;
        padding: 15px 3px;
        margin: 0 17px 20px 0;
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

    .missionBtn {
        border-radius: 1.5px;
        border: solid 0.5px #cccccc;
        background-color: #cccccc;
        font-family: SourceHanSansKR;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.18;
        letter-spacing: -0.56px;
        text-align: left;
        color: #3c3c3b;
        float: right;
        padding: 4px 40px;
        margin: 0 17px 20px 0;
    }

    .delivery_status {
        width: 281.4px;
        height: 48px;
        border-radius: 3px;
        border: solid 0.5px #dddddd;
        background-color: #ffffff;
        margin: 3px 0 20px 0;
    }

    .address {
        margin-left: 110px;
    }

    .address_number {
        width: 20%;
    }
</style>
