<template>
  <div class="dialog" v-show="isShow">
    <div class="container">
      <div class="header-dialog">
        {{ pokemonInfo.name }}
        <div class="close-btn" @click="closeDialog()">
          &times;
        </div>
      </div>
      <div class="body-dialog">
        <div class="c-flex">
          <div class="monitor">
            <div class="pokemon-show">
              <img :src="pokemonInfo.img" class="pokemon-img">
              <img src="../assets/boxleft.png" class="open-img box-left">
              <img src="../assets/boxright.png" class="open-img box-right">
            </div>
          </div>
          <div>
            <div class="bio-label">
              Info Pokemon
            </div>
            <div class="pokemon-bio">
              {{ pokemonInfo.bio }}
            </div>
          </div>
        </div>
        <div>
          <div class="keyboard">
            <div class="pokemon-stats">
              <div class="stat-item">
                <div class="stat-label">Hp</div>
                <div class="stat-bar hp" :style="{'width': `${hp * 2}px`}"></div> {{ hp }}
              </div>
              <div class="stat-item">
                <div class="stat-label">Attack</div>
                <div class="stat-bar attack" :style="{'width': `${attack * 2}px`}"></div> {{ attack }}
              </div>
              <div class="stat-item">
                <div class="stat-label">Defense</div>
                <div class="stat-bar defense" :style="{'width': `${defense * 2}px`}"></div> {{ defense }}
              </div>
              <div class="stat-item">
                <div class="stat-label">AttackSp</div>
                <div class="stat-bar attack-sp" :style="{'width': `${attackSp * 2}px`}"></div> {{ attackSp }}
              </div>
              <div class="stat-item">
                <div class="stat-label">DefenseSp</div>
                <div class="stat-bar defense-sp" :style="{'width': `${defenseSp * 2}px`}"></div> {{ defenseSp }}
              </div>
              <div class="stat-item">
                <div class="stat-label">Speed</div>
                <div class="stat-bar speed" :style="{'width': `${speed * 2}px`}"></div> {{ speed }}
              </div>
            </div>
          </div>
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
      hp: 0,
      attack: 0,
      defense: 0,
      attackSp: 0,
      defenseSp: 0,
      speed: 0,
      bio: ""
    }
  },
  watch: {
    isShow(value) {
      if (value) {
        this.statUpto("hp");
        this.statUpto("attack");
        this.statUpto("defense");
        this.statUpto("attackSp");
        this.statUpto("defenseSp");
        this.statUpto("speed");
        // this.statUpto("bio", 100);
      } else {
        this.resetData();
      }
    }
  },
  mounted() {

  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    statUpto(field) {
      if(this[field] >= this.pokemonInfo[field]) {
        return;
      }
      this[field]++;
      setTimeout(() => {
        this.statUpto(field)
      }, 1000 / 60)
    },
    resetData() {
      this.hp = 0;
      this.attack = 0;
      this.defense = 0;
      this.attackSp = 0;
      this.defenseSp = 0;
      this.speed = 0;
      this.bio = "";
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
      background-color: #fd7676;
      border-radius: 2px;
      .header-dialog {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 25px;
        font-weight: 900;
        .close-btn {
          font-size: 30px;
          font-weight: 900;
          cursor: pointer;
        }
      }
      .body-dialog {
        .monitor {
          border: solid 15px #f00;
          background-color: #f00;
          border-top-left-radius: 20px;
          margin-right: 10px;
        }
        .keyboard {
          width: 400px;
          padding: 15px;
          background-color: #f00;
          border-bottom-right-radius: 20px;
        }
        .pokemon-show {
          position: relative;
          width: 400px;
          height: 400px;
          overflow: hidden;
          background-image: url("@/assets/img-pokemon-dialog.jpg");
          background-size: cover;
          border-radius: 50px;
          .pokemon-img {
            width: 400px;
            height: 400px;
            filter: drop-shadow(0 0 10px);
          }
          .open-img {
            position: absolute;
            top: 0;
            width: 200px;
            height: 400px;
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
        .bio-label {
          font-size: 20px;
          line-height: 30px;
        }
        .pokemon-bio {
          border: solid 5px transparent;
          border-image: url("@/assets/pokemon-card-bg.jpg") 30;
          height: 240px;
          width: calc(80vw - 470px);
          padding: 10px;
          background-color: #fff;
        }
        .pokemon-stats {
          .stat-item {
            display: flex;
            align-items: center;
            margin-bottom: 3px;
            .stat-label {
              width: 80px;
            }
            .stat-bar {
              height: 10px;
              margin-right: 5px;
              border-radius: 9px;
              &.hp {
                background-color: #ff0000;
              }
              &.attack {
                background-color: #44ff00;
              }
              &.defense {
                background-color: #ff6500;
              }
              &.attack-sp {
                background-color: #0025ff;
              }
              &.defense-sp {
                background-color: #bb00ff;
              }
              &.speed {
                background-color: #00ffe2;
              }
            }
          }
        }
      }
    }
  }
  .c-flex {
    display: flex;
  }
  @keyframes open-box-left {
    0%   {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }
  @keyframes open-box-right {
    0%   {
      right: 0;
    }
    100% {
      right: -200px;
    }
  }
</style>