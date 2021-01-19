<template>
  <div class="profile">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <label for="">First Name </label><br />
          <input type="text" v-model="firstName" />
        </div>
        <div class="col">
          <label for="">Last Name </label><br />
          <input type="text" v-model="lastName" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="">Email</label><br />
          <input type="text" v-model="email" />
        </div>
        <div class="col">
          <label for="">Phone</label><br />
          <input type="text" v-model="phoneNumber" />
        </div>
      </div>
      <div class="row mt-3">
        <p><b>Login history</b></p>
        <p v-for="hist in history" :key="hist">hist.loginHistory</p>
      </div>

      <p class="mt-4"><b>Address</b></p>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationDefault01">House Number</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            v-model="houseNumber"
            placeholder="House number"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationDefault02">Street</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            v-model="streetName"
            placeholder="Street name"
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
      <button v-on:click="update" class="btn btn-primary btn-sm">Update</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      history: [],
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      houseNumber: "",
      streetName: "",
      city: "",
      state: "",
      pinCode: "",
    };
  },
  mounted() {
    console.log("inside profile");
    this.firstName = this.$store.state.userDetails.firstName;
    this.lastName = this.$store.state.userDetails.lastName;
    this.email = this.$store.state.userDetails.email;
    this.phoneNumber = this.$store.state.userDetails.phoneNumber;
    this.houseNumber = this.$store.state.userDetails.houseNumber;
    this.streetName = this.$store.state.userDetails.streetName;
    this.city = this.$store.state.userDetails.city;
    this.state = this.$store.state.userDetails.state;
    this.pinCode = this.$store.state.userDetails.pinCode;
  },
  methods: {
    update: function () {
      const putUrl = this.$store.state.API_LOCATION + "/api/user/";
      const data = {
        userId: localStorage.getItem("userId"),
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.address.phoneNumber,
        houseNumber: this.address.houseNumber,
        streetName: this.address.streetName,
        city: this.address.city,
        state: this.address.state,
        pinCode: this.address.pinCode,
      };
      console.log(data);
      axios
        .put(putUrl, data)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$store.state.userDetails = data;
          this.history = data;
        });
    },
  },
};
</script>