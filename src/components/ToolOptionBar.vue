<template>
<div>
  <div v-if="toolType === 'select'">
  </div>
  <div v-if="toolType === 'line'">
    <ColorPickerButton v-model=strokeColor icon="mdi-border-color"/>
    <ColorPickerButton v-model=fillColor icon="mdi-format-color-fill"/>
  </div>
</div>
</template>

<script>
import ColorPickerButton from './ColorPickerButton.vue';

export default {
  name: 'ToolOptionBar',

  components: {
    ColorPickerButton,
  },

  computed: {
    toolType() {
      return this.$store.state.activeTool;
    },
    strokeColor: {
      get() {
        return this.$store.state.styles.line.strokeColor;
      },
      set(value) {
        this.$store.commit('SET_STYLES_LINE_STROKE_COLOR', value);
      },
    },
    fillColor: {
      get() {
        return this.$store.state.styles.line.fillColor;
      },
      set(value) {
        this.$store.commit('SET_STYLES_LINE_FILL_COLOR', value);
      },
    },
  },
};
</script>
