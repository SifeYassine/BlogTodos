<template>
  <div
    class="modal overflow-auto fixed inset-0 z-10 bg-black bg-opacity-40 flex items-center justify-center"
    v-if="post"
  >
    <div
      class="modal-content bg-white m-auto p-5 border border-gray-400 max-w-2xl rounded-lg"
    >
      <span
        class="close text-gray-400 float-right text-2xl font-bold cursor-pointer"
        @click="$emit('close')"
        >&times;</span
      >
      <h2 class="text-2xl mb-5 font-bold">{{ post.title }}</h2>
      <p>{{ post.body }}</p>

      <h3 class="mt-4">Comments:</h3>
      <ul class="comments list-none p-0 mt-2">
        <li
          v-for="comment in comments"
          :key="comment.id"
          class="mb-2.5 p-2.5 bg-gray-100 rounded-lg shadow-md"
        >
          <strong>{{ getUsername(comment.userId) }}</strong>
          <br />
          {{ comment.body }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  max-width: 50%;
  max-height: 90%;
  overflow-y: auto;
}
</style>

<script>
export default {
  name: "PostModal",
  props: {
    post: Object,
    comments: Array,
    users: Array,
  },
  setup(props) {
    function getUsername(userId) {
      const user = props.users.find((user) => user.id === userId);
      return user ? user.username : "Unknown User";
    }

    return {
      getUsername,
    };
  },
};
</script>
