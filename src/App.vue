<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    console.log(this.$router);
    if (localStorage.getItem("userId") !== null) {
      const url =
        this.$store.state.API_LOCATION +
        `/api/user/${localStorage.getItem("userId")}`;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          this.$store.state.userDetails = data;
          this.$store.state.cart = data.cart;
        });
      this.$store.state.logout = false;
    }
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// color-green = #42b983
// color-blue = #2c3e50
</style>
