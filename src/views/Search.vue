<template>
  <div class="main mt-5">
    <div class="form-group has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        class="form-control"
        placeholder="Search"
        v-model="key.search"
        v-on:keyup.enter="search"
      />
    </div>
    <!-- <h1 class="text-center p-5">Search results</h1> -->
    <div class="row">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <!-- v-for="product in products" -->
        <div class="card product-item mb-5">
          <carousel :perPage="1">
            <slide>
              <!--v-for="(image, index) in product.images" -->
              <img
                :src="product.imageUrl"
                class="card-img-top"
                alt="..."
                width="250px"
              />
            </slide>
          </carousel>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ product.brandName }}</h5>
              <h5 class="card-priceS">{{ product.productName }}</h5>
            </div>
            <button class="btn btn-primary">
              <router-link
                :to="{ name: 'Product', query: { pid: product.id } }"
                class="view"
                >View Product</router-link
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  Name: "Search",
  data() {
    return {
      products: [],
      key: {
        search: null,
      },
    };
  },
  methods: {
    search() {
      const url =
        this.$store.state.API_LOCATION + `/api/search/${this.key.search}`;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.products = data;
        });
    },
  },
};
</script>

<style scoped>
.main {
  width: 50%;
  margin: 50px auto;
}
.has-search .form-control {
  padding-left: 2.375rem;
  outline-style: solid;
}
.has-search .form-control-feedback {
  position: absolute;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  color: #aaa;
  pointer-events: none;
}
</style>
