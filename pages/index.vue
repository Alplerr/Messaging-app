<template>
  <div>
    <div v-if="$auth.loggedIn">
      <h1>Welcome, {{ $auth.user.username }}</h1>
      <textarea v-model="newMessage" placeholder="Write your message..."></textarea>
      <button @click="sendMessage">Send</button>

      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.username }}:</strong> {{ msg.message }}
      </div>
    </div>
    <div v-else>
      <h1>Please login</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <form @submit.prevent="register">
        <input v-model="regUsername" placeholder="Username" />
        <input type="password" v-model="regPassword" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
      username: '',
      password: '',
      regUsername: '',
      regPassword: ''
    };
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
        this.fetchMessages();
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          username: this.regUsername,
          password: this.regPassword
        });
        await this.login();
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    async sendMessage() {
      try {
        await this.$axios.post('/api/messages', {
          message: this.newMessage,
          username: this.$auth.user.username
        });
        this.newMessage = '';
        this.fetchMessages();
      } catch (error) {
        console.error('Send message error:', error);
      }
    },
    async fetchMessages() {
      try {
        const { data } = await this.$axios.get('/api/messages');
        this.messages = data.messages;
      } catch (error) {
        console.error('Fetch messages error:', error);
      }
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.fetchMessages();
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
