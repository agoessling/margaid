<template>
  <v-menu v-model=showThis :close-on-content-click=false offset-y content-class="elevation-3">
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on"></slot>
    </template>
    <v-list>
      <FileNewMenu v-model=showFileNew @click=close v-slot="{ on }">
        <MenuItem :on="on" @click=openFileNew icon="mdi-plus" name="New" expand/>
      </FileNewMenu>
      <MenuItem @click=close icon="mdi-folder-outline" name="Open" shortcut="Ctrl+O"/>
      <MenuDivider/>
      <MenuItem @click=close icon="mdi-printer" name="Print" shortcut="Ctrl+P"/>
    </v-list>
  </v-menu>
</template>

<script>
import FileNewMenu from './FileNewMenu.vue';
import MenuDivider from './MenuDivider.vue';
import MenuItem from './MenuItem.vue';

export default {
  components: {
    FileNewMenu,
    MenuDivider,
    MenuItem,
  },

  data: () => ({
    showThis: false,
    showFileNew: false,
  }),

  methods: {
    close() {
      this.showThis = false;
    },

    openFileNew() {
      this.showFileNew = true;
    },
  },
};
</script>
