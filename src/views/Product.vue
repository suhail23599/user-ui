<template>
  <span v-if="dataLoaded">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <img :src="list.imageUrl" alt="" />
        </div>
        <div class="col-md-7">
          <h2>{{ list.productName }}</h2>
          <p>Product code:{{ list.id }}</p>
          <b-dropdown id="merchant" text="Merchant">
            <b-dropdown-item
              class="dec"
              v-for="(merchant, k) in merchantList"
              :key="merchant.merchantId"
            >
              <span class="mName">Merchant#{{ merchant.merchantId }}</span>
              <span class="price">₹{{ merchant.price }}</span>
              ><br />
              <button
                class="btn btn-primary btn-sm"
                @click="addToCart($event, k)"
              >
                Add to Cart
              </button>
              <!-- <add-to-cart
                :pid="list.productId"
                :iid="merchant.merchantID"
                :qty="1"
              /> -->
            </b-dropdown-item>
          </b-dropdown>
          <p><b>Availability:</b>In stock</p>
          <p><b>Brand:</b>{{ list.brandName }}</p>
          <p><b>Desc:</b>{{ list.productDescription }}</p>
          <p><b>Spec:</b></p>
          <div
            class="form-group"
            v-for="(specification, k) in list.specificationList"
            :key="k"
          >
            <p>{{ specification.key }} : {{ specification.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import AddToCart from "./AddToCart.vue";
import axios from "axios";
export default {
  components: { AddToCart },
  Name: "Product",
  data() {
    return {
      list: null,
      merchantList: [],
      dataLoaded: false,
    };
  },
  mounted() {
    const path = this.$route.query.pid;
    const url = this.$store.state.API_LOCATION + `/api/products/${path}`;
    axios.get(url).then((resp) => {
      this.list = resp.data;
      console.log(resp.data);
      this.dataLoaded = true;
      const merchantsUrl =
        this.$store.state.API_LOCATION + `/api/inventory/product/${path}`;
      axios
        .get(merchantsUrl)
        .then((res) => (this.merchantList = res.data))
        .then((data) => {
          console.log(data);
        });
    });
  },
  methods: {
    checkout() {
      this.$router.push("/checkout");
    },
    addToCart(event, k) {
      this.$store.state.cart.push({
        productId: this.list.id,
        inventoryId: this.merchantList[k].inventoryId,
        quantity: 1,
      });
      console.log(this.$store.state.cart);

      if (localStorage.getItem("userId") !== null) {
        let url =
          this.$store.state.API_LOCATION +
          `/api/user/cart/${localStorage.getItem("userId")}`;
        this.$store.state.userDetails.cart = this.$store.state.cart;
        // console.log(this.$store.state.userDetails);
        axios
          .put(url, this.$store.state.userDetails)
          .then((res) => res.data)
          .then((data) => {});
      }
      this.$router.push("/minicart");
    },
  },
};
</script>

<style scoped>
.h2 {
  color: #ec4646;
}
#buy {
  margin-left: 20px;
  margin-right: 20px;
}
.m-md-3 {
  background: #30475e;
  color: white;
}
.container {
  margin-top: 100px;
}
.col-md-7 h2 {
  color: #555;
}
.price {
  color: #fe980f;
  font-size: 18px;
  font-weight: bold;
  /* padding-top: 20px; */
}
.rating {
  font-size: 18px;
}
.mName {
  font-size: 15px;
}
input {
  border: 1px solid #ccc;
  font-weight: bold;
  text-align: center;
  width: 30px;
}
.btn {
  margin-left: 5px;
  margin-right: 5px;
}
.price {
  margin-left: 10px;
}
.dec {
  font-size: 20px;
}
/* .cart {
  background: #fe980f;
  color: #ffffff;
  font-size: 15px;
  margin-left: 20px;
} */
.bt {
  margin-left: 20px;
}
.cart {
  text-decoration: none;
  color: white;
}
.rating {
  margin-left: 15px;
}
#merchant {
  padding-bottom: 10px;
}
img {
  height: 20vh;
}
</style>
