<template>
  <main class="checkout mt-5 pl-5">
    <span class="font">Delivery address</span>
    <form>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationDefault01">House Number</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            placeholder="House number"
            v-model="address.houseNo"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationDefault02">Street</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="Street name"
            v-model="address.street"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="validationDefault03">City</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault03"
            placeholder="City"
            v-model="address.city"
            required
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault04">State</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault04"
            placeholder="State"
            v-model="address.state"
            required
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault04">Country</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault04"
            placeholder="Country"
            v-model="address.country"
            required
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault05">Pincode</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault05"
            placeholder="Pincode"
            v-model="address.pincode"
            required
          />
        </div>
      </div>
      <button class="btn btn-primary" type="submit" @click="update($event)">
        Update
      </button>
    </form>
    <button
      type="button"
      v-on:click="placeOrder"
      class="btn btn-success btn-lg btn-block mt-4 mr-5"
    >
      Place order
    </button>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      address: {},
    };
  },
  mounted() {
    const url =
      this.$store.state.API_LOCATION +
      `/api/user/${localStorage.getItem("userId")}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        this.address = data.address;
      });
  },
  methods: {
    update(e) {
      e.preventDefault();
      const putUrl =
        this.$store.state.API_LOCATION +
        `/api/user/address/${localStorage.getItem("userId")}`;
      axios
        .put(putUrl, this.address)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$store.state.userDetails = data;
        });
      window.alert("updated");
    },
    placeOrder: async function () {
      let cartList = this.$store.state.cart;
      console.log(cartList);
      const inventoryUrl =
        this.$store.state.API_LOCATION + `/api/inventory/cart/`;
      let inventoryList = [];
      axios
        .post(inventoryUrl, cartList)
        .then((res) => res.data)
        .then(async (data) => {
          console.log(data);
          inventoryList = data;
          let i = 0;
          for (i = 0; i < cartList.length; i++) {
            if (cartList[i].quantity > inventoryList[i].quantity) {
              alert("out of stock");
              break;
            }
          }
          if (i == cartList.length) {
            let salesList = [];
            for (let j = 0; j < cartList.length; j++) {
              salesList.push({
                productId: cartList[j].productId,
                userId: localStorage.getItem("userId"),
                merchantId: inventoryList[j].merchantId,
                quantity: cartList[j].quantity,
                price: inventoryList[j].price,
              });
            }
            const salesUrl =
              this.$store.state.API_LOCATION + `/api/sales/salesList`;
            axios.post(salesUrl, salesList).then(async (res) => {
              const emailUrl =
                this.$store.state.API_LOCATION +
                `/api/email/gopaluniphani@gmail.com`;
              let invoiceList = [];
              for (let j = 0; j < salesList.length; j++) {
                let product = await axios.get(
                  this.$store.state.API_LOCATION +
                    `/api/products/${cartList[j].productId}`
                );
                console.log(product.imageUrl);
                invoiceList.push({
                  productName: inventoryList[j].productName,
                  imageUrl: product.imageUrl,
                  price: inventoryList[j].price,
                  quantity: cartList[j].quantity,
                });
              }
              axios.post(emailUrl, invoiceList).then((res) => {
                console.log("done sending email");
              });

              this.$store.state.cart = [];
              const userUrl =
                this.$store.state.API_LOCATION +
                `/api/user/cart/${localStorage.getItem("userId")}`;
              axios.put(userUrl, {
                cart: [],
              });
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.font {
  font-family: "Merriweather", serif;
  font-size: 1.5rem;
}
.place {
  float: right;
}
.form-control {
  margin-right: 10px;
}
.btn {
  font-family: "Roboto", sans-serif;
}
</style>
