<template>
  <div class="dialog" :style="{'display': isShow ? 'block' : 'none'}">
    <div class="container">
      <div class="header-dialog">
        dialog
        <div class="close-btn" @click="closeDialog()">
          &times;
        </div>
      </div>
      <div class="body-dialog">
        <div class="pokemon-img">
          <img src="../assets/boxleft.png" class="open-img box-left">
          <img src="../assets/boxright.png" class="open-img box-right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogComponent',
  props: {
    isShow: {
      type: Boolean,
      require: true
    },
    pokemonInfo: {
      type: Object,
      require: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 10vh 10vw;
    background-color: #00000080;
    .container {
      width: 80vw;
      height: 80vh;
      padding: 10px;
      background-color: #fff;
      border-radius: 2px;
      .header-dialog {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .close-btn {
          font-size: 30px;
          font-weight: 900;
          cursor: pointer;
        }
      }
      .body-dialog {
        .pokemon-img {
          position: relative;
          width: 300px;
          height: 300px;
          overflow: hidden;
          .open-img {
            position: absolute;
            width: 150px;
            height: 300px;
            &.box-left {
              left: 0;
              animation: open-box-left 1s linear 0.5s normal both;
            }
            &.box-right {
              right: 0;
              animation: open-box-right 1s linear 0.5s normal both;
            }
          }
        }
      }
    }
  }
  @keyframes open-box-left {
    0%   {
      left: 0;
    }
    100% {
      left: -150px;
    }
  }
  @keyframes open-box-right {
    0%   {
      right: 0;
    }
    100% {
      right: -150px;
    }
  }
</style>