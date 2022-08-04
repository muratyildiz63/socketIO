<template>
  <div class="d-flex-center">
    <div class="mb50">{{ Myusername }}</div>

    <div class="center" v-if="!Myusername">
      <input type="text" placeholder="İsim" @keydown.enter="userName" />
    </div>
    <div v-if="Myusername" class="col-6">
      <div class="col-12">
        <input
          class="col-12"
          type="text"
          @keydown.enter="sendMessage"
          placeholder="Mesajını yazınız"
        />
      </div>
      <ul>
        <li
          v-for="(chats, index) in chat"
          :key="index"
          :class="{ my: chats.Name == Myusername }"
        >
        <span>{{ chats.Name }}</span>
          <span> {{ chats.message }}</span> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chat: [],
      Myusername: "",
    };
  },

  mounted() {
    this.$socket.on("user", this.SocketMessage);
  },

  methods: {
    userName(e) {
      this.Myusername = e.target.value;
    },

    SocketMessage(data) {
      this.chat.push(data);
    },
    sendMessage(e) {
      const nexChat = {
        Name: this.Myusername,
        message: e.target.value,
      };
      e.target.value=null
      this.$socket.emit("user", nexChat);
    },
  },
};
</script>


<style>
.col-6 {
  width: 50%;
}
.col-12 {
  width: 100%;
}
.mb50 {
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: white;
  font-weight: 500;
  font-size: 34px;
}
li.my {
  background: #a1f2aa;
  float: right;
  text-align: right;
}
li {
  padding: 10px;
  background: rgb(200 216 231);
  text-align: left;
  width: 51%;

  display: flex;
  border-radius: 8px;
  margin-bottom: 10px;
  flex-direction: column;
}
li span:first-child {
  font-size: 18px;
  line-height: 1;
  text-align: left;
  color: red;
  font-weight: 500;
  font-style: italic;
}
li.my span:first-child {
  text-align: right;
}
ul {
  margin: 0 !important;
  float: left;
  width: 100%;
  list-style-type: none;
  padding: 0;
}
.center {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    90deg,
    rgba(20, 214, 226, 1) 0%,
    rgb(37 61 34 / 80%) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}
input {
  height: 50px;
  border-radius: 5px;
  width: 300px;
  padding-left: 10px;
}
input.col-12 {
  width: 50%;
  position: fixed;
  bottom: 10px;
}
.d-flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

