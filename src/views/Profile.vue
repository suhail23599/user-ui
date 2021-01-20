<template>
  <div class="profile">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <label for="">First Name </label><br />
          <input type="text" v-model="user.firstName" />
        </div>
        <div class="col">
          <label for="">Last Name </label><br />
          <input type="text" v-model="user.lastName" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="">Email</label><br />
          <input type="text" v-model="user.email" />
        </div>
        <div class="col">
          <label for="">Phone</label><br />
          <input type="text" v-model="user.phoneNumber" />
        </div>
      </div>
      <div class="row mt-3">
        <p><b>Login history</b></p>
        <p v-for="(hist, k) in user.loginHistory" :key="k">{{ hist }}</p>
      </div>

      <p class="mt-4"><b>Address</b></p>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationDefault01">House Number</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            v-model="user.address.houseNo"
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
            v-model="user.address.street"
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
            v-model="user.address.city"
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
            v-model="user.address.state"
            required
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault04">Country</label>
          <input
            type="text"
            class="form-control"
            placeholder="Country"
            v-model="user.address.country"
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
            v-model="user.address.pincode"
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
      user: {
        address: {},
      },
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
        this.user = data;
      });
  },
  methods: {
    update: function () {
      const putUrl = this.$store.state.API_LOCATION + "/api/user/";
      console.log(this.user);
      axios
        .put(putUrl, this.user)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$store.state.userDetails = data;
        });
    },
  },
};
</script>