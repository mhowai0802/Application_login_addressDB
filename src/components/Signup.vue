<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Sign Up Form</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
          />
        </div>
        <button type="submit">
          <span class="material-icons"></span>Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script type="module">
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const response = await axios.post("http://localhost:3000/api/register", {
        username: this.formData["email"],
        password: this.formData["password"],
      });
      alert(`username: ${response.data.data['username']} password: ${response.data.data['password']}` );
      this.$router.push('/ani2');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  margin-left: 10px;
  flex-shrink: 0;
  width: 100px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  flex-grow: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-top: 5px;
  outline-color: #0000ff;
}
button[type="submit"] {
  padding: 1rem 3rem;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(88.18deg, #ff7b31 0.34%, #f669b5 121.79%);
  border-radius: 5px;
  border: none;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
}

button[type="submit"]:hover {
  background: linear-gradient(
    88.18deg,
    hsla(345, 100%, 60%, 0.541) 0.34%,
    hsl(162, 89%, 69%) 121.79%
  );
}
.material-icons {
  margin-right: 5px;
}
.signup-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.signup-button:hover {
  background-color: #0056b3;
}
</style>
