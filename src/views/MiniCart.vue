<template>
  <main class="mini-cart">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th class="text-center">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, k) in cartItemList" :key="k">
                <td class="col-sm-8 col-md-6">
                  <h4 class="media-heading">{{ item.productName }}</h4>
                </td>
                <td class="col-sm-1 col-md-1" style="text-align: center">
                  <input
                    type="number"
                    class="form-control"
                    id="qty"
                    v-model="item.quantity"
                    name="qty"
                    min="1"
                    max="5"
                    v-on:change="updatePrice($event, k)"
                  />
                </td>
                <td class="col-sm-1 col-md-1 text-center">
                  <strong>{{ item.totalPrice }}</strong>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <button type="button" class="btn btn-default">
                    <span class="glyphicon glyphicon-shopping-cart"></span>
                    Continue Shopping
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="checkout"
                  >
                    Checkout <span class="glyphicon glyphicon-play"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "MiniCart",
  data() {
    return {
      cartItemList: [],
    };
  },
  mounted() {
    let cartList = this.$store.state.cart;
    console.log(cartList);
    for (let i = 0; i < cartList.length; i++) {
      const productUrl =
        this.$store.state.API_LOCATION +
        `/api/products/${cartList[i].productId}`;
      axios
        .get(productUrl)
        .then((res) => res.data)
        .then((data) => {
          const inventoryUrl =
            this.$store.state.API_LOCATION +
            `/api/inventory/${cartList[i].inventoryId}`;
          axios
            .get(inventoryUrl)
            .then((res) => res.data)
            .then((invData) => {
              this.cartItemList.push({
                productName: data.productName,
                price: invData.price,
                totalPrice: invData.price,
                quantity: 1,
              });
            });
        });
    }
  },
  methods: {
    checkout() {
      let cartList = this.$store.state.cart;
      for (let i = 0; i < cartList.length; i++) {
        cartList.quantity = this.cartItemList.quantity;
      }
      this.$store.state.cart = cartList;
      this.$router.push("/checkout");
    },
    updatePrice(event, k) {
      this.cartItemList[k].totalPrice =
        this.cartItemList[k].price * this.cartItemList[k].quantity;
    },
  },
};
</script>
<style scoped>
</style>
