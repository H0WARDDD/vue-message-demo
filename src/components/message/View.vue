<template>
  <div class="bg-light vh-100 overflow-auto">
    <h1>Messages:</h1>
    <div v-for="item in messages">
      <div v-if="item.type === 'system'" class="text-center">
        <span class="badge badge-pill badge-info">{{ formatDate(item.date) }}: {{ item.message }}</span>
      </div>
      <template v-else>
        <transition name="fade">
          <div class="p-2" v-if="!item.isRecalled">
            <div class="border-bottom pb-2 mb-2 d-flex align-items-center">
              <small>{{ item.user }}</small>
              <small class="text-muted ml-auto">{{ formatDate(item.date) }}</small>
              <button class="btn btn-sm btn-warning ml-3" @click="doRecall(item)">Recall</button>
            </div>
            <div v-if="item.type==='image'">
              <img :src="item.message" />
            </div>
            <div v-else>{{ item.message }}</div>
          </div>
          <div class="p-3 text-center text-muted" v-else>You recalled a messsage</div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    history: Array
  },

  mounted() {
    if (this.history && this.history.length > 0)
      this.initMessages(this.history);
  },

  computed: {
    ...mapState("message", ["messages", "index"])
  },

  methods: {
    ...mapMutations("message", ["initMessages", "recallMessage"]),

    formatDate(date) {
      return new Date(date).toLocaleString();
    },

    doRecall(message) {
      let isConfirm = confirm("Are you sure to recall this message?");
      if (isConfirm) {
        this.recallMessage(message);
        this.$emit("messageRecalled", message);
      }
    }
  }
};
</script>