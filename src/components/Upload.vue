<template lang="html">
  <form enctype="multipart/form-data" id="fileForm" action="javascript;">
    <input type="file" name="logo"></input>
    <button @click="submitForm">确认</button>
  </form>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      fileList: [],
      uploadPath: 'http://localhost:3090/upload',
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      const form = document.getElementById('fileForm'); // eslint-disable-line
      const formData = new FormData(form); // eslint-disable-line
      api.post({
        url: 'upload',
        data: formData,
      }).then((res) => {
        console.log(res);
      });
    },
    handleSuccess(file, fileList) {
      console.log(file, fileList);
    },
    handleError(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss">
</style>