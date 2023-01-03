<template>
  <div id="app">
    <div class="search">
      <input type="text">
    </div>
    <div class="list-card">
      <div v-for="(poke, i) in pokemons" :key="i" class="card" @click="openDialog(poke)">
        <div class="card-header">
          {{ poke.name }}
        </div>
        <div class="card-img" :class="`type-${poke.types[0].type.name}`">
          <img :src="poke.sprites.other.home.front_default" >
        </div>
        <div class="card-list-type">
          <div v-for="type in poke.types" :key="type.type.name" class="card-type" :class="`type-${type.type.name}`">
            {{ type.type.name }}
          </div>
        </div>
      </div>
    </div>
    <DialogComponent :isShow="isShow" @closeDialog="closeDialog" />
    <div class="pagination">
      <button @click="page--">&lt;</button>
      {{ page }}
      <button @click="page++">&gt;</button>
    </div>
  </div>
</template>

<script>
import {getList, getInfo} from "./api/api"
import DialogComponent from "./components/DialogComponent"
export default {
  name: "App",
  data() {
    return {
      pokemons: [],
      page: 0,
      isShow: false,
      pokemonInfo: {
        name: "",
        img: "",
        hp: 0,
        attack: 0,
        defense: 0,
        attackSp: 0,
        defenseSp: 0,
        speed: 0
      }
    }
  },
  components: {
    DialogComponent
  },
  async mounted() {
    const { data } = await getList(this.page)
    const listPromise = data.results.map(item => getInfo(item.name))
    Promise.all(listPromise).then(res => this.pokemons = res.map(item => item.data).sort((a, b) => a.id - b.id))
  },
  methods: {
    async getInfoPoke(name) {
      const { data } = await getInfo(name)
      return data
    },
    openDialog(poke) {

    },
    closeDialog() {
      this.isShow = false;
    }
  },
}
</script>

<style lang="scss">
.search {
  text-align: center;
}
.list-card {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  width: 1450px;
  margin: auto;
  .card {
    height: 320px;
    width: 250px;
    margin: 5px;
    padding: 10px;
    background-image: url("https://img.lovepik.com//photo/50007/7678.jpg_300.jpg");
    background-color: #e7acac;
    border: solid 5px #000;
    border-radius: 10px;
    // filter: grayscale(1);
    // transition: filter .3s;
    &:hover {
      filter: grayscale(0);
    }
    .card-header {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
      text-transform: capitalize;
      color: #fff;
    }
    .card-img {
      text-align: center;
      border-radius: 10px;
      box-shadow: 1px 1px 4px 1px #5a5a5a;
      margin-bottom: 10px;
      transition: background-color .3s;
      img {
        width: 230px;
        filter: drop-shadow(0 0 10px);
      }
      &:hover {
        background-color: #0000;
        box-shadow: none;
      }
    }
    .card-list-type {
      display: flex;
      justify-content: center;
      .card-type {
        color: #fff;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 15px;
      }
    }
  }
  .type-normal {
    background-color: #a4acaf;
  }
  .type-fighting {
    background-color: #d56723;
  }
  .type-flying {
    background-color: #00eefd;
  }
  .type-poison {
    background-color: #a040a0;
  }
  .type-ground {
    background-color: #e0c068;
  }
  .type-rock {
    background-color: #a38c21;
  }
  .type-bug {
    background-color: #729f3f;
  }
  .type-ghost {
    background-color: #7b62a3;
  }
  .type-steel {
    background-color: #9eb7b8;
  }
  .type-fire {
    background-color: #f08030;
  }
  .type-water {
    background-color: #4592c4;
  }
  .type-grass {
    background-color: #9bcc50;
  }
  .type-electric {
    background-color: #f8d030;
  }
  .type-psychic {
    background-color: #f366b9;
  }
  .type-ice {
    background-color: #51c4e7;
  }
  .type-dragon {
    background-color: #177258;
  }
  .type-dark {
    background-color: #707070;
  }
  .type-fairy {
    background-color: #fdb9e9;
  }
  .type-unknown {
    background-color: #fff;
  }
  .type-shadow {
    background-color: #646464;
  }
  .text-invert {
    filter: invert(1);
  }
}
.pagination {
  text-align: center;
  font-size: 20px;
  button {
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: none;
    border-radius: 5px;
    background-color: #0000;
    font-weight: bold;
    transition: background-color .3s;
    &:hover {
      background-color: #bfbebe;
    }
  }
}
</style>
