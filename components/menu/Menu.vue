<template>
  <div id="nev">
    <img src="../../assets/logo.png"/>
    <div class="menu">
      <div class="menu_item" v-for="item in menus">
        <router-link :to="item.url">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuItem from '@/components/menu/MenuItem.vue'
  import MenuModel from '@/models/menu/MenuModel.js'

const menus = [
    new MenuModel('주문관리', '/orderList'),
    new MenuModel('CS관리', '/orderList'),
    new MenuModel('미션관리', '/orderList'),
    new MenuModel('상품관리', '/product'),
    new MenuModel('회원관리', '/orderList'),
    new MenuModel('게시판관리', '/orderList')
];

  export default {
    components: {
      MenuItem,
      MenuModel
    },
    data() {
      return {
        //logo: '@/assets/logo.png',
        menus: menus
        //currentMenu: null
      }
    }
  }
</script>

<style>
#nav {
  padding: 15px 30px 0px 30px;
  background-color: #ffffff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #8f0000;
}s
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
  padding: 2% 20% 0 20%;
}

.menu_item {
  padding-bottom: 20px;
}
</style>
