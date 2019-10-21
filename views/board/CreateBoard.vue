<template>
  <div class="content">
    <h1 class="sub_title">글쓰기 <select v-model="boardType"><option value="notice">notice</option><option value="event">event</option></select></h1>
    <div class="product_attr">
      <label class="attr_name">제목</label>
      <input v-model="title" class="attr" placeholder="제목"/>
    </div>
    <div>
      <vue-editor
              v-model="content"
              :editorToolbar="EDITOR_TOOLBAR"
              useCustomImageHandler
              @imageAdded="handleDetailImageChange"
              style="margin: 10px;"
              id="create-editor"
      >
      </vue-editor>
    </div>
    <div class="product_attr">
      <label class="attr_name">Start Date</label>
      <input v-model="start_dt" class="attr" placeholder="YYYY-MM-DD"/>
    </div>
    <div class="product_attr">
      <label class="attr_name">End Date</label>
      <input v-model="end_dt" class="attr" placeholder="YYYY-MM-DD"/>
    </div>
    <div>
      <button class="createBtn" @click="onClickSubmit">등록</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {VueEditor} from 'vue2-editor';
import { uploadFile, postBoard } from '../../api/admin';

const EDITOR_TOOLBAR = [
  [{'size': ['small', 'large', 'huge']}],
  [{'header': [1, 2, 3, 4, 5, 6]}],
  ['bold', 'italic', 'underline', 'strike'],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'align': []}],['image']
];

const DEFAULT_DATE = moment().format('YYYY-MM-DD');
export default {
  name: 'CreateBoard',
  components: {
    VueEditor,
  },
  data: () => ({
    EDITOR_TOOLBAR,
    boardType: 'notice',
    title: '',
    content: '',
    start_dt: DEFAULT_DATE,
    end_dt: DEFAULT_DATE,
  }),
  methods: {
    handleDetailImageChange(file, Editor, cursorLocation, resetUploader){
      uploadFile(file).then(imgSrc => {
        Editor.insertEmbed(cursorLocation, "image", imgSrc);
        resetUploader();
      });
    },
    onClickSubmit() {
      const body = {
        "title": this.title,
        "content": this.content,
        "visible": 0,
        "start_dt": this.start_dt,
        "end_dt": this.end_dt,
      };
      postBoard(this.boardType, body).then(() => alert('ok!')).catch(e => alert('something went wrong!'));
    },
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-flow: column wrap;
  margin: 56px 170px 60px 170px;
  border: solid 0.5px #b3b3b3;
  background-color: #ffffff;
  padding: 50px 0;
}

.sub_title {
  font-family: SourceHanSansKR;
  font-size: 25px;
  line-height: 1.4;
  text-align: left;
  color: #3c3c3b;
  margin: 0 0 20px 80px;
}

.product_attr {
  display: flex;
}

.attr_name {
  width: 100px;
  margin: 20px 0px 18px 100px;
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
</style>