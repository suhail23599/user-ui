<template>
  <div class="add-to-cart">
    <button class="btn btn-primary btn-sm" @click="addToCart">
      Add to Cart
    </button>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: "AddToCart",
  props: {
    pid: String,
    iid: Number,
    qty: Number,
  },
  data() {
    return {
      item: {
        productId: this.pid,
        inventoryId: this.iid,
        quantity: this.qty,
      },
    };
  },
  methods: {
    addToCart() {
      console.log(this.pid, this.iid, this.qyt);
      // console.log("addToCart item", this.item);
      this.$router.push("/minicart");
      this.$store.commit("addToCart", this.item);
    },
  },
};
</script>
