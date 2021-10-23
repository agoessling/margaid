<template>
<v-list-item v-on=on @click=onClick :ripple="false" link class="menu-item">
    <v-icon class="menu-icon">{{ icon }}</v-icon>
    <span class="menu-name">{{ name }}</span>
    <span class="menu-shortcut grey--text text--darken-1">{{ shortcut }}</span>
    <v-icon v-if="expand" class="menu-expand">mdi-chevron-right</v-icon>
</v-list-item>
</template>

<script>
export default {
  props: {
    icon: String,
    name: String,
    shortcut: String,
    expand: Boolean,
    on: Object,
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style>
.menu-item {
  padding: 0 10px !important;
  min-height: 30px !important;
  height: 30px !important;
}

.menu-icon {
  margin-right: 10px !important;
  font-size: 18px !important;
}

.menu-expand {
  margin-right: -4px !important;
  font-size: 18px !important;
}

.menu-name {
  flex-grow: 1;
  font-size: 14px;
}

.menu-shortcut {
  margin-left: 15px;
  font-size: 14px;
}
</style>
