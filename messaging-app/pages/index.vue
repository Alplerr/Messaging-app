<!-- Kullanıcıların oturum açmasını ve mesaj göndermesini sağlar.-->
<template>
  <div>
    
    <!-- Eğer kullanıcı oturum açtıysa burayı göster-->
    <div v-if="$auth && $auth.loggedIn">
      <h1>Welcome, {{ $auth.user.username }}</h1>
      <textarea v-model="newMessage" placeholder="Mesajınızını buraya yazın..."></textarea>
      <button @click="sendMessage">Send</button>

      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.username }}:</strong> {{ msg.message }}
      </div>
    </div>
    <!-- Eğer kullanıcı açmadıysa bu kısmı göster.-->
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
  // Yeni mesajı saklamak, mesajları saklamak, kullanıcı adı giriş için, şifre giriş için, kayıt için kullanıcı adı ve kayıt için şifre kısımlarını tutar sırasıyla.
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
  // giriş işlemi 
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        });
        this.fetchMessages();   // mesajları çeker
      } catch (error) {
        console.error('Login error:', error);   // hata kontrolü var ise
      }
    },
    //kayıt işlemi
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          username: this.regUsername,
          password: this.regPassword
        });
        // kayıttan sonra otomatik giriş yapsın.
        await this.login();
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    //mesaj gönderme işlemi
    async sendMessage() {
      try {
        await this.$axios.post('/api/messages', {
          message: this.newMessage,                 //mesajları gönderildikten sonra temizle.
          username: this.$auth.user.username
        });
        this.newMessage = '';
        this.fetchMessages();                      // mesajları güncellesin.
      } catch (error) {
        console.error('Send message error:', error);
      }
    },
    
    //mesajları çek.
    async fetchMessages() {
      try {
        const { data } = await this.$axios.get('/api/messages');
        this.messages = data.messages;      //mesajları güncelle
      } catch (error) {
        console.error('Fetch messages error:', error);
      }
    }
  },
  mounted() {
  console.log(this.$auth);  // giriş yapılıp yapılmadığını kontrol etsin.
  if (this.$auth && this.$auth.loggedIn) {
    this.fetchMessages();   // eğer giriş yapılmış ise mesajları çek.
  }
}
    
}
;
</script>





