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
            v-model="houseNumber"
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
            v-model="streetName"
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
            v-model="city"
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
            v-model="state"
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
            v-model="pinCode"
            required
          />
        </div>
      </div>
      <button class="btn btn-primary" type="submit" @click="update($event)">
        Update
      </button>
    </form>
    <button type="button" class="btn btn-success btn-lg btn-block mt-4 mr-5">
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
      address: {
        houseNumber: "",
        streetName: "",
        city: "",
        state: "",
        pinCode: "",
      },
    };
  },
  mounted() {
    this.firstName = this.$store.state.userDetails.firstName;
    this.lastName = this.$store.state.userDetails.lastName;
    this.email = this.$store.state.userDetails.email;
    this.phoneNumber = this.$store.state.userDetails.phoneNumber;
  },
  methods: {
    update(e) {
      e.preventDefault();
      const putUrl =
        this.$store.state.API_LOCATION +
        `/api/user/${localStorage.getItem("userId")}`;
      console.log(data);
      axios
        .put(putUrl, address)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$store.state.userDetails = data;
        });
      window.alert("updated");
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
