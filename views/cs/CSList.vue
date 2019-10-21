<template>
    <Content>
        <h1 class="sub_title">문의사항 조회</h1>
        <table>
            <thead>
            <tr>
                <th v-for="key in columns">
                    {{ key.column }}
                </th>
            </tr>
            </thead>
            <tbody>
            <router-link
                    v-for="product in productList"
                    :to="'\/product\/' + product.product_id"
                    tag="tr"
            >
                <td v-for="key in columns">
                    {{ product[key.id] }}
                </td>
            </router-link>
            </tbody>
        </table>
    </Content>
</template>

<script>
import store from '@/store/store'
import Content from '@/components/content/Content'

import { findProductList } from "../../api/admin";

const columns = [
    {
        "id": "product_id",
        "column": "번호"
    },
    {
        "id": "category",
        "column": "문의사항"
    },
    {
        "id": "product_name",
        "column": "답변상태"
    },
    {
        "id": "price",
        "column": "생성일"
    }
];



export default {
    name: 'orders',
    components: {
        Content
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
        font-size: 17px;
    }

    td {
        font-size: 14px;
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
</style>
