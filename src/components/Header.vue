<template>
  <div id="nav">
    <b-navbar toggleable="lg" class="bg">
      <b-navbar-brand href="#" id="brand"
        ><router-link id="log" to="/">WattShop</router-link></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item id="cat1">
            <router-link class="item" to="/cat1">Washing Machine</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="item" to="/cat2">Refrigerator</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="item" to="/cat3">Vaccuum Cleaner</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="item" to="/cat4">TV</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="item" to="/cat5">Oven</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button id="search" class="btn-info"
              ><router-link class="dec" to="/search"
                >Search for Products</router-link
              ></b-button
            >
            <span v-if="this.$store.state.logout">
              <a href="/signup"
                ><b-button id="signup" class="btn-info"
                  ><b
                    ><router-link class="dec" to="/signup">
                      Sign Up</router-link
                    ></b
                  ></b-button
                ></a
              >
              <b-button class="btn-info" action="../views/Login.vue"
                ><b
                  ><router-link class="dec" to="/login">Login</router-link></b
                ></b-button
              >
            </span>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em class="user">User</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link to="/profile">Profile</router-link></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link to="/minicart"> Cart</router-link></b-dropdown-item
            >
            <span v-if="!this.$store.state.logout">
              <b-dropdown-item @click="logoutMethod">Sign Out</b-dropdown-item>
            </span>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- Links -->

  <!-- Navbar -->
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      logout: this.$store.state.logout,
    };
  },
  methods: {
    logoutMethod: function () {
      localStorage.removeItem("userId");
      console.log("inside logout");
      this.$store.state.logout = true;
      this.$store.state.cart = [];
      this.$store.state.userDetails = {};
      if (this.$router.history.current.fullPath !== "/") this.$router.push("/");
    },
  },
  mounted() {
    if (localStorage.getItem("userId") !== null) this.login = true;
  },
};
</script>

<style scoped>
.bg {
  background-color: #11698e;
}
#log {
  text-decoration: none;
  color: ivory;
}
.item {
  color: black;
  text-decoration: none;
}
#brand {
  font-size: 2.5rem;
}
#search {
  padding-right: 10px;
  margin-right: 10px;
}
#signup {
  margin-right: 10px;
}
.dec {
  padding: 10px;
  color: white;
  text-decoration: none;
}
.nav-item {
  font-size: 1.5rem;
  color: green;
}
.user {
  font-style: inherit;
}
.brand {
  color: black;
}
</style>
