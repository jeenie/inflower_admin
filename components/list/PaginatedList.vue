<template>
  <div>
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
          v-for="item in paginatedData"
          :to="url + item.id"
          tag="tr"
        >
          <td v-for="key in columns">
            {{ item[key.id] }}
          </td>
        </router-link>
      </tbody>
    </table>
    <div class="pagination">
      <button :class="[pageNum === 0 ? 'disbled': '']" @click="prevPage()" class="pageBtn">
        &lt;
      </button>
      <button
        class="pageBtn"
        v-for="i in 3"
        @click="goPage(pageNum + i - 1)"
        :class="[pageNum === pageNum + i - 1 ? 'active' : '']"
      >{{ pageNum + i }}</button>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage()" class="pageBtn">
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
      description: "테이블 컬럼 목록"
    },
    list: {
      type: Array,
      required: true,
      description: "서버에서 받은 데이터 목록"
    },
    url: {
      type: String,
      required: true,
      description: "url 설정을 위한 문자열"
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 0
    }
  },
  computed: {
    pageCount() {
      let listLength = this.list.length,
          listSize = this.pageSize,
          page = Math.floor(listLength / listSize);

      if(listLength % listSize > 0) page += 1;

      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;

      return this.list.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    goPage(page) {
      console.log(page);
      this.pageNum = page;
    }
  }
}
</script>

<style>
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
