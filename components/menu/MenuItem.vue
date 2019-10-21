<template>
  <div
    class="item"
    :class="{active: isActive}"
    @click="$emit('input', menu)">
    {{ menu.name }}
  </div>
</template>

<script>
  import MenuModel from '@/models/menu/MenuModel.js'

  export default {
    components: {
      MenuModel
    },
    props: {
      menu: {
        type: MenuModel,
        required: true,
        description: "menu context"
      },
      value: {
        type: MenuModel,
        description: "menu active"
      }
    },
    computed: {
      isActive() {
        return this.menu === this.value;
      }
    }
  }
</script>
