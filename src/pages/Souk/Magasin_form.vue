<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form magasin</p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <q-input
          label="Image"
          stack-label
          v-model="img"
          type="file"
          accept="image/*"
        />

        <q-input
          label="Name"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="zone"
          v-model="form.zone"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          color="teal"
          filled
          hover-reveal
          v-model="form.type_id"
          :options="optionsCategory"
          label="Categorie"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'category is required']"
        />

        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          color="teal"
          filled
          hover-reveal
          v-model="form.genre"
          :options="optionsGenre"
          label="Genre"
          option-value="name"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'genre is required']"
        />

        <q-btn
          :label="isUpdate ? 'Update' : 'Save'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'mesmagasin' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageFormCategory",
  setup() {
    const table = "magasins_tab";
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update, list, uploadImg, getByColKeyAndKeyWord } =
      useApi();
    const { notifyError, notifySuccess } = useNotify();

    const isUpdate = computed(() => route.params.id);
    let product = {};
    const optionsCategory = ref([]);
    const optionsGenre = ref([]);
    const tempvar = ref("");

    const form = ref({
      name: "",
      categorie: "",
      img_url: "",
      zone: "",
      genre: "",
      type_id: ref(),
    });
    const img = ref([]);
    onMounted(() => {
      handleListCategories();
      handleListgenres();

      console.log("voici , ", optionsGenre.value);

      if (isUpdate.value) {
        handleGetProduct(isUpdate.value);
      }
    });

    const handleListCategories = async () => {
      optionsCategory.value = await list("magasin_type_tab");
    };

    const handleListgenres = async () => {
      optionsGenre.value = await list("genre");
    };

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], "products");
          form.value.img_url = imgUrl;
        }

        if (isUpdate.value) {
          tempvar.value = await getByColKeyAndKeyWord(
            "magasin_type_tab",
            "id",
            form.value.type_id
          );

          form.value.categorie = tempvar.value[0].name;
          await update(table, form.value);

          notifySuccess("Updated successfully");
        } else {
          await post(table, form.value);
          notifySuccess("Saved successfully");
        }
        router.push({ name: "mesmagasin" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id);
        form.value = product;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory,
      optionsGenre,

      img,
    };
  },
});
</script>
