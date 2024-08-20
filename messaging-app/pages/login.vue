<template>
    <div>
      <!-- kullanıcı giriş yapmadıysa bunu göster -->
      <div v-if="!$auth.loggedIn">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <input v-model="username" placeholder="Username" />
          <input type="password" v-model="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
  
      <!-- kullanıcı giriş yaptıysa bunu göster -->
      <div v-else>
        <h1>Welcome, {{ user.username }}</h1>
        <button @click="logout">Logout</button>
        <h2>Your Profile</h2>
        <p>Username: {{ user.username }}</p>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    computed: {
      user() {
        return this.$auth.user;     //giriş yapmış kullanıcıyı döndürür.
      }
    },
    methods: {
      async login() {
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          });
          this.$router.push('/'); // giriş yaptıktan sonra ana sayfaya yönlendirir.
        } catch (error) {
          console.error('Login error:', error);
        }
      },
      async logout() {
        try {
          await this.$auth.logout();
          this.$router.push('/login'); // kullanıcı çıkış yaptıktan sonra ana sayfaya atar.
        } catch (error) {
          console.error('Logout error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stil ekleyebilirsiniz */
  </style>
  