<template>
<v-menu v-model=showPicker offset-y :close-on-content-click=false>
  <template v-slot:activator="{ on }">
    <v-btn v-on="on" text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon combo-icon">{{ icon }}</v-icon>
      <v-icon :color=value class="toolbutton-icon combo-icon">mdi-color-helper</v-icon>
    </v-btn>
  </template>
  <v-card>
    <v-color-picker :value=value @input=onInput show-swatches/>
    <v-card-actions>
      <v-spacer/><v-btn small text outlined color="primary" @click="showPicker=false">Ok</v-btn>
    </v-card-actions>
  </v-card>
</v-menu>
</template>

<script>
import { throttle } from 'lodash';

export default {
  props: {
    icon: String,
    value: String,
  },

  methods: {
    onInput: throttle(function onInput(color) {
      this.$emit('input', color);
    }, 200),
  },

  data: () => ({
    showPicker: false,
  }),
};
</script>

<style>
.combo-icon {
  position: absolute !important;
}
</style>
