<template lang="html">
  <div class="clippings">
    <div class="clippings-wrapper" v-if="state.clippings.length">
      <div class="books">
        <ul class="book-list">
          <li class="book" v-for="(clipping, index) in state.clippings" :data-index="index" @click="switchBook">{{ clipping.title }}</li>
        </ul>
      </div>
      <div class="details">
        <div class="detail-wrapper">
          <div class="cover-wrapper">
            <img :src="state.clippings[activeIndex].detail.cover"></img>
          </div>
          <div class="info-wrapper">
            <p class="title">{{state.clippings[activeIndex].detail.title}}</p>
            <p class="author">{{state.clippings[activeIndex].detail.author}}</p>
            <p class="summary">{{state.clippings[activeIndex].detail.summary}}</p>
          </div>
        </div>
        <div class="content-wrapper">
          <ul class="content-list">
            <li class="content" v-for="mark in content">{{ mark.text }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: this.$store.state,
      activeIndex: 0,
    };
  },
  computed: {
    content() {
      return this.state.clippings
        && this.state.clippings[this.activeIndex]
        && this.state.clippings[this.activeIndex].marks;
    },
    detail() {
      return this.state.clippings
        && this.state.clippings[this.activeIndex]
        && this.state.clippings[this.activeIndex].detail;
    },
  },
  methods: {
    switchBook(v) {
      const index = v.target.dataset.index;
      this.activeIndex = index;
      if (!this.state.clippings[index].detail.url) {
        this.$store.dispatch('getBookDetail', {
          index,
          title: this.state.clippings[index].title,
          author: this.state.clippings[index].author,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.clippings {
  width: 100%;
  height: 100%;
}

.clippings-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  // border-top: 1px solid #D3DCE6;

  .books {
    flex: 1;
    max-width: 330px;

    .book-list {
      padding: 0;
      margin: 0;

      .book {
        list-style: none;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 16px;
        text-align: left;
        border-top: 1px solid #E5E9F2;
        word-break: break-all;
        overflow: hidden;
        cursor: pointer;
        color: #475669;
      }

      .book:first-child {
        border-top: none;
      }

      .book:hover {
        background-color: #58B7FF;
        color: #fff;
      }
    }
  }

  .details {
    flex: 2;
    border-left: 1px solid #D3DCE6;

    .detail-wrapper {
      margin: 20px 30px;
      padding: 14px 14px;
      border: 0;
      border-radius: 4px;
      background-color: #1d8ce0;
      color: #fff;
      box-sizing: border-box;
      display: flex;

      .cover-wrapper {
        max-width: 200px;
        max-height: 300px;
        flex: 1;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info-wrapper {
        margin-left: 28px;
        text-align: left;
        flex: 1;

        .title {
          margin: 16px 0;
          font-size: 38px;
          font-weight: 500;
        }

        .author {
          margin: 16px 0;
          font-size: 28px;
        }
      }
    }

    .content-wrapper {
      .content-list {
        padding: 0;
        margin: 0;

        .content {
          list-style: none;
          padding: 18px 10px;
          margin: 0 30px;
          text-align: left;
          border-top: 1px solid #C0CCDA;
          box-sizing: border-box;
          color: #475669;
          font-size: 20px;
          line-height: 34px;
        }

        .content:first-child {
          border-top: none;
        }

        .content:hover {
          background-color: #58B7FF;
          color: #fff;
        }
      }
    }
  }
}
</style>