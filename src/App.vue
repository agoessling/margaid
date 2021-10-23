<template>
<div id="app" class="row-container">
  <div id="toolbar">Toolbar</div>
  <div id="center" class="col-container">
    <div id="main"><Sheet></Sheet></div>
    <div id="sidebar">Sidebar</div>
  </div>
  <div id="footer">Footer</div>
</div>
</template>

<script lang="js">
import Vue from 'vue';

import Sheet from './components/Sheet.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Sheet,
  },
});
</script>

<style>
html, body {
  overflow-y: auto !important;
  margin: 0;
}

html, body, #app {
  height: 100%;
}

#toolbar {
  height: 80px;
  min-height: 80px;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #babdbe;
  background-color: #eceff1;
}

#center {
  flex: 1;
}

#sidebar {
  width: 200px;
  min-width: 200px;
  border-style: solid;
  border-width: 0 0 0 1px;
  border-color: #babdbe;
  background-color: #eceff1;
}

#main {
  flex: 1;
}

#footer {
  height: 25px;
  min-height: 25px;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: #babdbe;
  background-color: #eceff1;
}

.row-container, .col-container {
  display:flex;
}

.row-container {
  flex-direction: column;
}

.col-container {
  flex-direction: row;
}
</style>
