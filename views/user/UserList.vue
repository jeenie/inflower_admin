<template>
    <Content>
        <h1 class="sub_title">회원 리스트</h1>
        <List :list="userList" :columns="checkVersion" :url="'\/user\/'" />
    </Content>
</template>

<script>
import store from '@/store/store'
import Content from '@/components/content/Content'
import List from '@/components/list/PaginatedList'

import { findB2CUserList } from "../../api/admin";

const b2bColumns = [
    {
        "id": "user_id",
        "column": "번호"
    },
    {
        "id": "user_email",
        "column": "이메일"
    },
    {
        "id": "user_name",
        "column": "아이디"
    },
    {
        "id": "user_email",
        "column": "연락처"
    } ,
    {
        "id": "user_created_at",
        "column": "최근접속일"
    } ,
    {
        "id": "user_created_at",
        "column": "최근미션수행일"
    } ,
    {
        "id": "user_created_at",
        "column": "가입일"
    }
];

const columns = [
    {
        "id": "user_id",
        "column": "번호"
    },
    {
        "id": "user_email",
        "column": "이메일"
    },
    {
        "id": "user_name",
        "column": "아이디"
    },
    {
        "id": "user_email",
        "column": "연락처"
    } ,
    {
        "id": "user_created_at",
        "column": "최근접속일"
    } ,
    {
        "id": "user_created_at",
        "column": "최근구매일"
    } ,
    {
        "id": "user_created_at",
        "column": "가입일"
    }
];

export default {
    components: {
        Content,
        List
    },
    data() {
        return {
            columns,
            userList: []
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
        findB2CUserList().then(list => {
            this.userList = list;
        });
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
