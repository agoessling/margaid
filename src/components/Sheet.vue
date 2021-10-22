<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="js">
import Sheet from '../Sheet';

export default {
  name: 'Sheet',

  mounted() {
    const { canvas } = this.$refs;

    const sheet = new Sheet(canvas);

    window.addEventListener('resize', () => { sheet.resize(); });
  },
};
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>
