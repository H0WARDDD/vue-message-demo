<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-8">
        <Message :history="history" />
      </div>
      <div class="col-4 border-left">
        <h1>Debug:</h1>

        <transition name="fade">
          <div class="alert alert-warning" v-if="errorMessage">{{ errorMessage }}</div>
        </transition>
        <div class="form-group">
          <label>Message:</label>
          <textarea class="form-control" v-model="message"></textarea>
        </div>
        <div class="form-group">
          <label>Type:</label>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="type"
                id="type1"
                value="user"
                v-model="type"
              />
              <label class="form-check-label" for="type1">User message</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="type"
                id="type2"
                value="system"
                v-model="type"
              />
              <label class="form-check-label" for="type2">System message</label>
            </div>
          </div>
        </div>
        <hr />
        <div class="form-group">
          <label for="image">Image:</label>
          <div v-if="image" class="mb-2">
            <span class="d-inline-block border">
              <img :src="image" />
            </span>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="image" @change="handleImage" />
            <label class="custom-file-label" for="image">Choose file</label>
          </div>
        </div>
        <hr />
        <div class="form-group" v-if="type==='user'">
          <label>User:</label>
          <input type="text" class="form-control" v-model="user" placeholder="User..." />
        </div>
        <button class="btn btn-primary" @click="doPush">Push</button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./components/message/View";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      image: null,
      errorMessage: "",
      user: "Howard Li",
      message: "Testing message",
      type: "user",
      history: [
        {
          user: "Guest 1",
          message: "This is a test message 1",
          date: "2019-08-21T10:40:00.000Z",
          type: "user"
        },
        {
          user: "Guest 2",
          message: "This is a test message 2",
          date: "2019-08-21T10:41:00.000Z",
          type: "user"
        },
        {
          user: null,
          message: "Guest 3 Join the Group",
          date: "2019-08-21T10:42:00.000Z",
          type: "system"
        },
        {
          user: "Guest 3",
          message: "Hello everyone",
          date: "2019-08-21T10:43:00.000Z",
          type: "user"
        }
      ]
    };
  },

  methods: {
    ...mapMutations("message", ["addMessage"]),

    doPush() {
      if ((this.image || this.message) && this.user) {
        this.errorMessage = null;
        this.addMessage({
          message: this.image ? this.image : this.message,
          user: this.type === "user" ? this.user : null,
          type: this.image ? "image" : this.type
        });
      } else {
        this.errorMessage = "Please input message/user";
      }
    },

    handleImage(event) {
      let file = event.target.files[0];
      if (file) {
        if (file.type.includes("image")) {
          this.errorMessage = null;
          let reader = new FileReader();
          reader.onload = () => {
            this.image = reader.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.errorMessage = "Invalid file";
        }
      } else {
        this.image = null;
      }
    }
  },

  components: {
    Message
  }
};
</script>
