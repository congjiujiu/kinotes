<template>
  <div id="app">
    <upload></upload>
    <clippings></clippings>
  </div>
</template>

<script>
import Upload from './components/Upload';
import Clippings from './components/Clippings';

export default {
  name: 'app',
  components: {
    Upload,
    Clippings,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}

html, body {
  height: 100%;
  widht: 100%;
  margin: 0;
  padding: 0;
}
</style>
