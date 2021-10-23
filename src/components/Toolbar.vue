<template>
<div class="toolbar">
  <div class="document-header">
    <img class="logo" alt="margaiD logo" src="../assets/logo.svg">
    <div class="d-flex flex-column justify-end">
      <div class="text-h5 ml-2">Document Name</div>
      <div>
        <FileMenu v-slot="{ on }">
          <v-btn v-on="on" :ripple=false text class="menubutton">File</v-btn>
        </FileMenu>
        <v-btn :ripple=false text class="menubutton">Edit</v-btn>
        <v-btn :ripple=false text class="menubutton">View</v-btn>
        <v-btn :ripple=false text class="menubutton">Help</v-btn>
      </div>
    </div>
  </div>
  <div class="buttonbar">
    <v-btn text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon">mdi-undo</v-icon>
    </v-btn>
    <v-btn text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon">mdi-redo</v-icon>
    </v-btn>
    <v-btn text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon">mdi-printer</v-icon>
    </v-btn>
    <v-divider inset vertical class="tooldivider"/>
    <v-btn text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon">mdi-cursor-default</v-icon>
    </v-btn>
    <v-btn text class="toolbutton">
      <v-icon color="grey darken-2" class="toolbutton-icon">mdi-vector-polyline</v-icon>
    </v-btn>
    <v-divider vertical class="tooldivider"/>
  </div>
</div>
</template>

<script>
import FileMenu from './FileMenu.vue';

export default {
  name: 'Toolbar',

  components: {
    FileMenu,
  },
};
</script>

<style>
.menubutton {
  text-transform: none !important;
  padding: 4px 6px !important;
  min-width: 0 !important;
  height: 24px !important;
  font-weight: 400 !important;
}

.toolbar {
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #dadce0;
}

.buttonbar {
  display: flex;
  padding-left: 10px;
}

.tooldivider {
  margin: 7px 6px 7px 0 !important;
}

.toolbutton {
  padding: 0 !important;
  margin: 5px 6px 5px 0 !important;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
}

.toolbutton-icon {
  font-size: 18px !important;
}

.logo {
  width: 30px;
  margin: 12px;
}
.document-header {
  display: flex;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #dadce0;
  padding-bottom: 4px;
}
</style>
