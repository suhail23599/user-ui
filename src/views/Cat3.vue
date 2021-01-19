<template>
  <div id="vaccuum">
    <div class="container">
      <h1 class="text-center p-5">Vacuum Cleaners</h1>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  Name: "Cat3",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    const url = this.$store.state.API_LOCATION + "/api/products/category/5";
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.products = data;
      });
  },
};
</script>

<style scoped>
img {
  height: 300px;
}
.view {
  text-decoration: none;
  color: white;
}
</style>
