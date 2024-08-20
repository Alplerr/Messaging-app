export default {
  head: {
    title: 'messaging-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  // bu modülleri yüklesin.
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],
  ServerMiddleware: [
    '~/index.js', //server middleware olarak index.js dosyasını eklesin.
  ],

  // ismi verilen modülleri eklesin.
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth.next',
  ],

  axios: {
    baseURL: 'http://localhost:5000', // api sunucu URL'si
  },
  
  
  //kimlik doğrulaması için kullanılır.
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          //login işlemi için post isteği yapacak url.
          login: { url: '/api/auth/login', method: 'post' },
          //logout işlemi için post isteği yapacak url.
          logout: { url: '/api/auth/logout', method: 'post' },
          //kullanıcı bilgisini almak için get isteği yapacak url.
          user: { url: '/api/auth/user', method: 'get' },
        }
      }
    }
  },
  this$axios:post('/api/auth/login', {
    username: this.username,
    password: this.password
  }),
  
middleware: 'auth'
  }

  //HATALAR:
  // Auth modülünde hata var. Ya modül eksik yükleniyor ya da entegre kısmı sorunlu ama çözemedim.
  //frontend kısmı yüklendiği zaman linke tıkladığımda gözükmüyor, auth modülüyle yüzünden böyle bir sorun olduğunu düşünüyorum veya ayrı bir hata bundan emin değilim.
  build: {}




