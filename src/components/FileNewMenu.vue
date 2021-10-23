<template>
  <v-menu :value=value @input=menuChange :close-on-content-click=false
    open-on-hover open-delay=400 offset-x content-class="elevation-3">
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on"></slot>
    </template>
    <v-list>
      <MenuItem @click=onClick name="Drawing"/>
      <MenuItem @click=onClick name="Library"/>
    </v-list>
  </v-menu>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
  components: {
    MenuItem,
  },

  props: {
    value: Boolean,
  },

  methods: {
    onClick(event) {
      this.menuChange(false);
      this.$emit('click', event);
    },

    menuChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>
