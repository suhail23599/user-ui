<template>
  <div class="view-product">
    <button class="btn btn-primary" @click="viewProduct">View Product</button>
    </div>
</template>
<script>
export default {
  name: 'ViewProduct',
  props: {
    productId: String
  },
  data () {
    return {
      pId: this.productId
    }
  },
  methods: {
    viewProduct () {
      this.$router.push('/product')
    }
  }
}
</script>
