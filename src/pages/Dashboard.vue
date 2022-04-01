<template>
  <q-page>
    <div v-if="user">
      <p>
        Voici your dashboard. Votre role est : {{ user.user_metadata.role }}
      </p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const { user } = useAuthUser();
    return {
      user,
    };
  },
  mounted() {
    this.$q.dark.set(true);
  },
});
</script>
