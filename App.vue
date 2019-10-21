<template>
  <div id="app">
    <div id="nav">
      <select class="country_select" v-model="checkCountry" @change="onChangeCountry($event)">
        <option disabled value="">국가 선택</option>
        <option v-for="option in countryList" v-bind:value="option.countryCode" v-model="country">{{ option.countryName }}</option>
      </select>
      <img src="./assets/logo.png"/>
      <!--
      <button class="b2_btn" :class="{ isActive: activeBtn('b2c') }" @click="activeVersion('b2c')">B2C</button>
      <button class="b2_btn" :class="{ isActive: activeBtn('b2b') }" @click="activeVersion('b2b')">B2B</button>
      -->
      <div class="menu">
        <div class="menu_item" v-for="item in menus">
          <router-link :to="{ path: item.url }">{{ item.name }}</router-link>
        </div>
        <li class="menu__item menu__item--dropdown" v-on:click="toggle('ranking')" v-bind:class="{'open' : dropDowns.ranking.open}">
          <a class="menu__link menu__link--toggle" href="#">
            <span>게시판관리</span>
            <i class="menu__icon fa fa-angle-down"></i>
          </a>

          <ul class="dropdown-menu">
            <li class="dropdown-menu__item">
              <router-link to="/board/notice" class="dropdown-menu__link">공지사항</router-link>
            </li>

            <li class="dropdown-menu__item">
              <router-link to="/board/event" class="dropdown-menu__link">이벤트</router-link>
            </li>
          </ul>
        </li>
      </div>
    </div>
    <router-view/>
    <div class="footer">
      <hr style="border: solid 1px #cccccc;"/>
      <p>Copyright © 2019 Inflower. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import MenuModel from '@/models/menu/MenuModel.js'
import store from '@/store/store'

const menus = [
    //new MenuModel('주문관리', '/order'),
    new MenuModel('CS관리', '/cs'),
    //new MenuModel('미션관리', '/mission'),
    new MenuModel('상품관리', '/product'),
    new MenuModel('회원관리', '/user')
];

export default {
  components: {
    MenuModel
  },
  data() {
    return {
      checkCountry: store.getters.getCountry,
      menus,
      countryList: [
        { countryName: '대한민국', countryCode: 'kr' },
        { countryName: '싱가폴', countryCode: 'sg' }
      ],
      country: '',
      dropDowns: {
        ranking: { open: false}
      }
    }
  },
  computed: {
  },
  methods: {
    activeVersion(ver) {
      return store.commit('changeVersion', ver);
    },
    activeBtn(ver) {
      return ver === store.getters.getVersion;
    },
    onChangeCountry(event) {
      store.commit('changeCountry', event.target.value);
      console.log(store.getters.getCountry);
    },
    toggle(dropdownName) {
      this.dropDowns[dropdownName].open = !this.dropDowns[dropdownName].open;
    },
    close: function() {
      for (dd in this.dropDowns) {
        this.dropDowns[dd].open = false;
      }
    }
  }
}
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
    padding: 0;
}

img {
  margin-left: -11%
}

button:focus {
  outline:0;
}

li {
  list-style: none;
}

input[type='checkbox'] {
  display: inline-block;
	width: 20px;
	height: 20px;
	border: 2px solid #bcbcbc;
	cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f7f7f7;
  padding-bottom: 100px;
}
#nav {
  padding: 15px 160px 0px 160px;
  background-color: #ffffff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #8f0000;
}

.menu {
  font-family: SourceHanSansKR;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -1.5px;
  text-align: left;
  color: #3c3c3b;
  display: flex;
  justify-content: space-between;
  padding: 2% 3% 0 3%;
}

.menu_item {
  padding-bottom: 20px;
}

.country_select {
  width: 90px;
  height: 30px;
  border-radius: 15.5px;
  border: solid 0.5px #cccccc;
  background-color: #f7f7f7;
  font-family: SourceHanSansKR;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.94;
  letter-spacing: 3.6px;
  text-align: left;
  float: left;
  margin-left: 3%;
}

.b2_btn {
  border-radius: 15.5px;
  border: solid 0.5px #cccccc;
  background-color: #f7f7f7;
  font-family: SourceHanSansKR;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.94;
  letter-spacing: 3.6px;
  text-align: left;
  color: #b3b3b3;
  padding: 0 29px;
  float: right;
  margin-right: 2%;
}

.isActive {
  border: solid 0.5px #3c3c3b;
  background-color: #3c3c3b;
  color: #ffffff;
}

.open .dropdown-menu {
  display: block;
  text-align: center;
}

.dropdown-menu {
  font-size: 0.9rem;
  position: absolute;
  min-width: 130px;
  display: none;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-left: -35px;
  padding: 0;
}

.dropdown-menu__item:first-child .dropdown-menu__link {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.dropdown-menu__item:last-child .dropdown-menu__link {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.dropdown-menu__link {
  display: block;

  padding: 4px;
  color: blue;
  background-color: #fafafa;

  &:hover {
    color: green;
    background-color: #ccc;
  }
}

.footer{
  margin: 0 110px;
}
</style>
