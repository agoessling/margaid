<template>
<div>
  <div v-if="toolType === 'select'">
  </div>
  <div v-if="toolType === 'line'">
    <ColorPickerButton v-model=lineColor icon="mdi-border-color"/>
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
  },

  data: () => ({
    lineColor: '#000000FF',
    fillColor: '#000000FF',
  }),
};
</script>
