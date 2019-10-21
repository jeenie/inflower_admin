<template>
    <Content>
        <h1 class="sub_title"> 미션 관리 <router-link to="/board/create" tag="button" class="addBtn">미션정책 수정</router-link></h1>
        <List :list="missionList" :columns="columns" :url="'\/mission\/'" />
    </Content>
</template>

<script>
import Content from '@/components/content/Content'
import List from '@/components/list/PaginatedList'

import { findMissionList } from "../../api/admin";

const columns = [
    {
        "id": "influencer_mission_id",
        "column": "번호"
    } ,
    {
        "id": "influencer_name",
        "column": "아이디"
    },
    {
        "id": "product_name",
        "column": "상품명"
    },
    {
        "id": "snsMissionStatus",
        "column": "승인상태"
    },
    {
        "id": "message",
        "column": "거절사유"
    },
    {
        "id": "influencer_mission_created_at",
        "column": "생성일"
    }
];

export default {
    name: 'orders',
    components: {
        Content,
        List
    },
    data() {
        return {
            columns,
            missionList: []
        }
    },
    computed: {
        checkVersion() {
            if(this.version === 'b2b')
                return b2bColumns;
            else
                return b2cColumns;
        }
    },
    mounted() {
        findMissionList().then(list => {
            this.missionList = list;
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

    strong {
        color: #8f0000;
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
</style>
