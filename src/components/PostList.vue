<template>
  <div>
    <!-- Button to Create a New Post -->
    <button
      v-if="loggedIn"
      @click="showCreatePostModal"
      class="ml-[45vw] mb-5 px-4 py-2 bg-green-500 text-white rounded-full shadow-md"
    >
      Create Post
    </button>

    <ul class="posts grid grid-cols-4 gap-5 w-4/5 mx-auto">
      <li
        v-for="post in paginatedPosts"
        :key="post.id"
        @click="showPostDetails(post)"
        class="cursor-pointer rounded-lg bg-gray-100 shadow-md p-2.5 relative"
      >
        <div class="flex flex-col h-full">
          <div class="flex-1">
            <strong>{{ post.title }}</strong>
            <p>{{ post.body }}</p>
          </div>
          <div class="flex gap-3">
            <!-- Edit Button -->
            <button
              @click.stop="editPost(post)"
              class="w-[25%] mt-2 px-2 py-1 bg-blue-500 text-white rounded-full shadow-md"
            >
              Edit
            </button>

            <!-- Delete Button -->
            <button
              @click.stop="deletePost(post.id)"
              class="w-[25%] mt-auto px-2 py-1 bg-red-500 text-white rounded-full shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="pagination flex items-center justify-center mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="mx-1 my-0 px-2 py-1 cursor-pointer border border-gray-300 bg-gray-100 rounded-full shadow-md"
      >
        Previous
      </button>
      <span class="mx-2">Page {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="mx-1 my-0 px-2 py-1 cursor-pointer border border-gray-300 bg-gray-100 rounded-full shadow-md"
      >
        Next
      </button>
    </div>

    <!-- Import and Use PostModal, EditPostModal, and CreatePostModal Components -->
    <PostModal
      v-if="selectedPost"
      :post="selectedPost"
      :comments="comments"
      :users="users"
      @close="closeModal"
    />
    <EditPostModal
      v-if="editingPost"
      :post="editingPost"
      :showModal="!!editingPost"
      @close="closeEditModal"
      @updated="updatePostInList"
    />
    <CreatePostModal
      v-if="showCreateModal"
      :showModal="showCreateModal"
      @close="closeCreateModal"
      @created="addNewPost"
    />
  </div>
</template>

<style>
.pagination button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<script>
import { ref, onMounted, computed } from "vue";
import { setupAxios } from "../router/axios";
import PostModal from "./ViewPostModal.vue";
import EditPostModal from "./EditPostModal.vue";
import CreatePostModal from "./CreatePostModal.vue";
import UserList from "./UserList.vue";

export default {
  name: "PostList",
  components: {
    PostModal,
    EditPostModal,
    CreatePostModal,
    UserList,
  },
  setup() {
    const posts = ref([]);
    const users = ref([]);
    const axios = setupAxios();
    const selectedPost = ref(null);
    const comments = ref([]);
    const editingPost = ref(null);
    const showCreateModal = ref(false);
    const currentPage = ref(1);
    const pageSize = 8;
    const loggedIn = ref(localStorage.getItem("user") !== null);

    function fetchPosts() {
      axios
        .get("/posts")
        .then((response) => {
          posts.value = response.data.slice(0, 20); // Limiting to 20 posts
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function fetchUsers() {
      axios
        .get("/users")
        .then((response) => {
          users.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const totalPages = computed(() => {
      return Math.ceil(posts.value.length / pageSize);
    });

    const paginatedPosts = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      return posts.value.slice(startIndex, startIndex + pageSize);
    });

    function fetchComments(postId) {
      axios
        .get(`/comments?postId=${postId}`)
        .then((response) => {
          comments.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function showPostDetails(post) {
      selectedPost.value = post;
      fetchComments(post.id);
    }

    function closeModal() {
      selectedPost.value = null;
      comments.value = [];
    }

    function editPost(post) {
      editingPost.value = post;
    }

    function closeEditModal() {
      editingPost.value = null;
    }

    function updatePostInList(updatedPost) {
      const index = posts.value.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        posts.value[index] = updatedPost;
      }
    }

    function showCreatePostModal() {
      showCreateModal.value = true;
    }

    function closeCreateModal() {
      showCreateModal.value = false;
    }

    function addNewPost(newPost) {
      posts.value.push(newPost);
      closeCreateModal();
    }

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    function deletePost(postId) {
      axios
        .delete(`/posts/${postId}`)
        .then(() => {
          posts.value = posts.value.filter((post) => post.id !== postId);
          if (selectedPost.value && selectedPost.value.id === postId) {
            closeModal();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onMounted(() => {
      fetchPosts();
      fetchUsers();
    });

    return {
      paginatedPosts,
      selectedPost,
      comments,
      showPostDetails,
      closeModal,
      editingPost,
      editPost,
      closeEditModal,
      updatePostInList,
      showCreatePostModal,
      showCreateModal,
      closeCreateModal,
      addNewPost,
      currentPage,
      totalPages,
      previousPage,
      nextPage,
      deletePost,
      users,
      loggedIn,
    };
  },
};
</script>
