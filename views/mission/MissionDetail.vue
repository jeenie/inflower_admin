<template>
    <div class="content">
        <h1 class="sub_title">
            미션 상세 조회/수정
        </h1>
        <div class="product_detail">
            <div class="img_list">
                <p>스타일 사진</p>
                <div v-for="(url, index) in productImgList" :key="url+index" class="img_item">
                    <youtube v-if="isYoutube(url)" :video-id="getYoutubeVideoId(url)" ref="youtube"></youtube>
                    <img v-else :src="url" />
                </div>
            </div>
            <div class="product_attr">
                <label class="attr_name">승인 상태</label>
                <select v-model="snsMissionStatus" class="mission_status">
                    <option disabled value="">승인상태</option>
                    <option value="deny">거절</option>
                    <option value="wait">미승인</option>
                    <option value="regist">등록</option>
                    <option value="confirm">확인</option>
                    <option>etc</option>
                </select>
                <button class="missionBtn">상태 수정</button>
            </div>
            <div class="product_attr">
                <label class="attr_name">승인 거절 사유</label>
                <select class="mission_status">
                    <option value="">-</option>
                </select>
                <button class="missionBtn">상태 수정</button>
            </div>
            <div class="product_attr">
                <label class="attr_name">생성일</label>
                <input v-model="mission.influencer_mission_created_at" class="attr" placeholder="상품번호" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">상품명</label>
                <input v-model="mission.product_name" class="attr" placeholder="카테고리" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">아이디</label>
                <input v-model="mission.influencer_name" class="attr" placeholder="상품명" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">작성후기</label>
                <textarea v-model="mission.influencer_review" class="attr" placeholder="작성후기" readonly />
            </div>
            <div class="product_attr">
                <label class="attr_name">해시태그</label>
                <textarea v-model="mission.message" class="attr" placeholder="해시태그" readonly />
            </div>
        </div>
    </div>
</template>

<script>
import Content from "@/components/content/Content";
import {
    putProductVisible,
    putProductHidden, findMissionByInfluencerMissionId
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
            mission: {},
            snsMissionStatus: '',
            proImgSrc: '',
            productImgList: [],
        }
    },
    computed: {
        missionId() {
            return Number(this.$route.params.missionId);
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
        findMissionByInfluencerMissionId(this.missionId).then(([data]) => {
            this.mission = data;
            this.snsMissionStatus = this.mission.snsMissionStatus;
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
    display: flex;
    flex-flow: column wrap;
    margin: 56px 170px 50px 170px;
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
    width: 10%;
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

.mission_status {
    width: 281.4px;
    height: 48px;
    border-radius: 3px;
    border: solid 0.5px #dddddd;
    background-color: #ffffff;
    margin: 3px 15px 20px 0;
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
</style>
