<template>
  <div class="optionBox">
    <label class="option">옵션</label>
    <input v-model="option_name" class="option_name" placeholder="옵션명"/>
    <component v-for="item in optionDetails" :is="item"></component>
    <button
      @click="addOptionDetail"
      class="option_detail_add"
    >
      상세 옵션 추가
    </button>
  </div>
</template>
<script>
import OptionDetail from '@/components/product/OptionDetail'

export default {
  components: {
    OptionDetail
  },
  data() {
    return {
      option_name: '',
      optionDetails: []
    }
  },
  methods: {
    addOptionDetail() {
      this.optionDetails.push('OptionDetail');
    }
  }
}
</script>
<style>
.optionBox {
  float: left;
  margin-top: 40px;
}

.option {
  margin: 0 110px 20px 0;
}

.option_name {
  width: 762.6px;
  border-radius: 3px;
  border: solid 0.5px #dddddd;
  background-color: #ffffff;
  float: right;
  padding: 15px 0 15px 10px;
  margin: 0 86px 20px 0;
}

.option_detail_add {
  font-family: SourceHanSansKR;
   font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.94;
  border-radius: 3px;
  border: solid 0.5px #cccccc;
  background-color: #e6e6e6;
  color: #3c3c3b;
  padding: 10px 40px;
  margin-left: 142px;
}
</style>
