<template>
  <q-page>
    <div class="q-pa-md q-gutter-md row justify-center">
      <div
        class="relative-position container bg-grey-3 text-black inline flex flex-center text-center"
        style="border-radius: 50%; cursor: pointer; width: 150px; height: 150px"
      >
        <div v-if="user" class="q-py-md">
          <p>Bonjour {{ user.user_metadata.name }}</p>
          <p>Cette section sera bientôt disponible.</p>
          <q-img src="~assets/appIcon.png" no-native-menu> </q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();
    const var1 = ref();
    const var2 = ref();
    const var3 = ref();

    var jours = new Array("Lundi", "Mardi", "Mercredi");
    const { listPublic, listmagasinwithname } = useApi();

    console.log("me vle user  ", user.value.id);

    onMounted(() => {});

    return {
      user,
      jours,
    };
  },
});
</script>
