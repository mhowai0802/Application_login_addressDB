<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
        async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        const token = response.data.token;
        console.log(token)
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Login failed:', error.response.data.message)
      }
    }
    }
  };
  </script>
  
  <style>
  .login {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f8f8f8;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 6px;
  }
  
  input {
    padding: 6px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 8px 12px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>