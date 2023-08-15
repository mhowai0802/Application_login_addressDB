<template>
  <div class="outside-div">
    <img src="..\assets\HKT_logo.png" class="icon">

    <!-- <h3 class="ib text-title py-2">Network checking</h3> -->
  </div>


  <div>
    <br/>
    <div>Area</div>
    <select id="menu" v-model="input_area">
      <option v-for="(item,idx) in this.area_list" :key="idx">{{ item }}</option>
    </select>
    <div>District</div>
    <select id="menu" v-model="input_district">
      <option v-for="(item,idx) in this.district_list" :key="idx">{{ item }}</option>
    </select>    
    <div>Housing Address</div>
    <input 
    type="text" 
    v-model="input_housing_addr" 
    placeholder="Enter some text" 
    class="text-input" 
    v-bind:class="{
              'is-valid': validation.valid.username,
              'is-invalid': validation.invalid.username
            }"
            v-on:focus="clearValidation('username')"> <br/>
    <div>Type of Issue</div>
    <input type="text" v-model="input_typeofissue" placeholder="Enter some text" class="text-input"> <br/><br/>

    <div>
      <p class="result-text">Currently selected: {{ this.input_area+this.input_district+this.input_housing_addr+this.input_typeofissue }}</p>
    </div>

    <button @click="insertData" class="submit-button">Submit</button>
  </div>



</template>

<script>
import Dropdown from "C:\\Users\\user\\Desktop\\VScode\\frontend-login\\src\\components\\Dropdown.vue"
import axios from 'axios'
import cheerio, { Cheerio } from 'cheerio';


export default {
  
  data(){
    return {
      input_area: '',
      input_district: '',
      input_housing_addr: '',
      input_typeofissue: '',
      area_list: [],
      district_list: [],
      validation: {
        invalid: {},
        valid: {}
      }
    }
  },
  name: 'App',
  components: {
    Dropdown
  }

,
  methods: {
    async fetchData() {
        const apiURL = 'http://localhost:3000/api/data'
        const response = await axios.get(apiURL)
        const result = response['data']
        console.log(result)
    },
    insertData() {
    const data = {
      area: `${this.input_area}`,
      district: `${this.input_district}`,
      housing_address: `${this.input_housing_addr}`,
      type_of_issue: `${this.input_typeofissue}`
    };
    axios.post('http://localhost:3000/api/insert', data)
      .then(response => {
        console.log(response.data); // Success message from the server
      });
  },
  async scrapeData() {
      try {
        const response = await axios.get('https://shopdailyhk.com/%E9%A6%99%E6%B8%AF%E5%90%84%E5%8D%80%E5%9F%9F%E5%8F%8A%E5%9C%B0%E5%8D%80/'); // Replace with the URL you want to scrape
        const $ = cheerio.load(response.data);
        const itemList = [];
        const extractedData = $('.wp-block-table tbody');
        extractedData.find('tr td:nth-child(2)').each((childIndex, childElement) => {
        const textContent = $(childElement).text().replace(/\s+/g, '');
        this.area_list.push(textContent);
        });

        extractedData.find('tr td:nth-child(3)').each((childIndex, childElement) => {
        const textContent = $(childElement).text().replace(/\s+/g, '');
        this.district_list.push(textContent);
        });

        }
        catch (error) {
          console.error('Error scraping data:', error);
        }
        this.area_list = this.area_list.slice(1)
        this.district_list = this.district_list.slice(1)
        console.log(`${this.area_list}`);
        this.district_list = this.district_list.flatMap(item => item.split('、'));

    },

    async changeLanguage() {
      const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: "",
        source: "auto",
        target: "en",
        format: "text",
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" }
    });
    console.log(await res.json());
    },
    validate() {
      console.log(this.username,)
      if (!this.username) {
        this.validation.invalid.username = "Please enter your username.";
      } else if (this.username.length < 2) {
        this.validation.invalid.username =
          "Username should have a minimum of 2 characters.";
      } else if (this.username.match(/[^a-z]/i)) {
        this.validation.invalid.username =
          "Username should only contain Latin letters (a-z).";
      } else {
        this.validation.valid.username = "Username is valid.";
      }
      if (!this.password) {
        this.validation.invalid.password = "Please enter your password.";
      } else if (this.password.length < 8) {
        this.validation.invalid.password =
          "Password should have a minimum of 8 characters.";
      } else if (this.password.match(/[^a-z]/i)) {
        this.validation.invalid.password =
          "Password should only contain Latin letters (a-z).";
      } else {
        this.validation.valid.password = "Password is strong.";
      }
      this.$forceUpdate();
    },
    clearValidation(field) {
      this.validation.valid[field] = "";
      this.validation.invalid[field] = "";
      this.$forceUpdate();
    }

},

mounted() {
  this.scrapeData()
}
  


}
</script>




<style scoped>
#app {
  margin-top: 0px;
  padding: 0;
}

.outside-div {
  padding: 0;
  margin: 0;
}

.button {
  position: absolute;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  top: 30px;
}

.icon {
  position: relative;
  top: 0;
  left: 0;
  width: 10%;
  height: auto;
  vertical-align: 0%;
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
  font-family: Georgia, 'Times New Roman', Times, serif;
  position: relative;
  height: auto;

}

.text-body {
  font-size: 1.2rem;
  font-family: Georgia, sans-serif;
  position: relative;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
}

.result-name {
  font-weight: bold;
  color: #3366cc;
}

.result-value {
  color: #ff8800;
}

.submit-button {
  position: relative;
  padding: 0.75em 3em;
  background-color: hsl(231, 86%, 67%);
  border: none;
  color: #f9fafb;
  border-radius: 1rem;
  font: inherit;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: all 200ms ease-in;}

.submit-button:hover {
  background-color: #224499;
}

.text-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
}

.result-text {
  font-size: 18px;
  color: #333;
}

</style>
