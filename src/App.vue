<template>
  <div class="outside-div">
    <img src="./assets/HKT_logo.png" class="icon ib">
    <h4 class="ib text-title">Network checking</h4>
  </div>

  <Dropdown
  :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
  v-on:selected="validateSelection"
  v-on:filter="getDropdownValues"
  :disabled="false"
  name="zipcode"
  :maxItem="10"
  placeholder="Please select an option">
  </Dropdown>
  <div>

    <li v-for="{ message } in post">
        {{ message }}
    </li>

  </div>


</template>

<script>
import Dropdown from "./components/Dropdown.vue"
import axios from 'axios'


export default {
  data(){
    return {
      post: []
    }
  },
  name: 'App',
  components: {
    Dropdown
  }
,
mounted(){
  axios.get('https://shop.hkt.com/broadband/addresslookup.html?keyword=%20&limit=10', {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})
.then(response => response.data)
.then(data => this.post = data)

}
,
  methods: {}
}
</script>




<style>
#app {
  margin-top: 0px;
  padding: 0;
}

.outside-div {
  padding: 0;
  margin: 0;
}

.icon {
  position: relative;
  top: 0;
  left: 0;
  width: 10%;
  height: auto;
}

.ib {
  display: inline-block;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select {
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.text-title {
  font-size: 3rem;
  font-family: Helvetica, sans-serif;
  position: relative;
  left: 0;
  padding: 10px;
  margin: 0;
}

.text-body {
  font-size: 1.5rem;
  font-family: Georgia, sans-serif;
  position: relative;
}
</style>
