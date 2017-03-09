<template lang="html">
  <div class="uploader">
    <form enctype="multipart/form-data" id="fileForm" action="javascript;">
      <a href="javascript;" class="a-upload">
        <div class="info">
          <p>{{ infoMessage }}</p>
          <p @click="submitForm" class="submit" v-if="filename">确认</p>
        </div>
        <input type="file" name="logo" @change="fileSelected"></input>
      </a>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      uploadPath: 'http://localhost:3090/upload',
      uploadRes: '',
      filename: '',
    };
  },
  methods: {
    fileSelected(e) {
      const filename = e.target.value.split('\\');
      const fLength = filename.length;
      this.filename = filename[fLength - 1];
    },
    submitForm(e) {
      e.preventDefault();
      const form = document.getElementById('fileForm'); // eslint-disable-line
      const formData = new FormData(form); // eslint-disable-line
      api.post({
        url: 'upload',
        data: formData,
      }).then((res) => {
        console.log(this);
        if (res.status === 200) {
          this.uploadRes = res.statusText;
        }
      });
    },
    handleSuccess(file, fileList) {
      console.log(file, fileList);
    },
    handleError(file) {
      console.log(file);
    },
  },
  computed: {
    infoMessage() {
      return this.filename || '点击上传文件';
    },
  },
};
</script>

<style lang="scss">
.uploader {
  .a-upload {
    padding: 4px 10px;
    width: 360px;
    height: 180px;
    line-height: 180px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    text-decoration: none;
  }

  .a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .a-upload:hover {
    border-color: #20a0ff;
  }

  .a-upload .info p {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    height: 90px;
    line-height: 90px;
    color: #97a8be;
    text-decoration: none;
  }

  .a-upload .info .submit {
    color: #000;
    font-size: 1.4rem;
  }

  .a-upload .info .submit:hover {
    color: #20a0ff;
  }
}
</style>