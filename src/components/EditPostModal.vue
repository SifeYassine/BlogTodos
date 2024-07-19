<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <span
        @click="closeModal"
        class="close text-gray-400 float-right text-2xl font-bold cursor-pointer"
        >×</span
      >
      <h2 class="text-2xl mb-5 font-bold">Edit Post</h2>
      <form @submit.prevent="updatePost">
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Title:</label>
          <input
            id="title"
            v-model="post.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg bg-white"
            required
          />
        </div>
        <div class="mb-4">
          <label for="body" class="block text-gray-700">Body:</label>
          <textarea
            id="body"
            v-model="post.body"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded-lg bg-white"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #4a5568;
}
</style>

<script>
import { ref } from "vue";
import { setupAxios } from "../router/axios";

export default {
  name: "EditPostModal",
  props: {
    post: Object,
    showModal: Boolean,
  },
  setup(props, { emit }) {
    const axios = setupAxios();
    const post = ref({ ...props.post });

    function closeModal() {
      emit("close");
    }

    function updatePost() {
      axios
        .put(`/posts/${post.value.id}`, post.value)
        .then(() => {
          emit("updated", post.value);
          closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return {
      post,
      closeModal,
      updatePost,
    };
  },
};
</script>
