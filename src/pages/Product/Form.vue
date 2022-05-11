<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form product</p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <div id="display_image" v-if="form.img_url != ''">
          <q-img :src="form.img_url"> </q-img>
        </div>

        <div v-else>
          <q-avatar
            size="1000%"
            color="grey"
            text-color="white"
            icon="mdi-image-off"
          />
        </div>

        <q-input
          label="Image"
          stack-label
          v-model="img"
          type="file"
          accept="image/*"
          class="q-pt-xs"
          id="image_input"
        />

        <q-input
          label="Nom"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 0) || 'Nom est obligatoire']"
        />
        <q-editor v-model="form.description" min-height="Screw" />
        <q-input
          label="Quantité"
          v-model="form.amount"
          :rules="[(val) => !!val || 'Quantité est obligatoire']"
          type="number"
        />
        <q-input
          label="Prix"
          v-model="form.price"
          :rules="[(val) => !!val || 'Prix est obligatoire']"
          type="price"
          prefix="DA"
        />
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          color="teal"
          filled
          hover-reveal
          v-model="form.category_id"
          :options="optionsCategory"
          label="Catégorie"
          option-value="name"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Catégorie est obligatoire']"
        />
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          color="teal"
          filled
          hover-reveal
          v-model="form.magasin_id"
          :options="optionsMagasin"
          label="Mon magasin"
          option-value="id"
          option-label="name"
          map-options
          emit-value
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
          :to="{ name: 'product' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageFormCategory",
  setup() {
    const { user } = useAuthUser();
    const table = "product_tab";
    const table2 = "magasins_tab";
    const router = useRouter();
    const route = useRoute();
    const {
      post,
      getById,
      update,
      list,
      uploadImg,
      getByColKeyAndKeyWord,
      listPriveProdAvecMagasin,
    } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const isUpdate = computed(() => route.params.id);
    let product = {};
    const optionsCategory = ref([]);
    const optionsMagasin = ref([]);

    const form = ref({
      name: "",
      description: "",
      amount: 0,
      price: 0,
      category_id: "",
      img_url: "",
      magasin_id: ref(),
    });
    const img = ref([]);
    onMounted(() => {
      handleListCategories();
      handleListMagasins();

      if (isUpdate.value) {
        handleGetProduct(isUpdate.value);
      }
    });

    const handleListCategories = async () => {
      optionsCategory.value = await list("magasin_type_tab");
    };
    const handleListMagasins = async () => {
      optionsMagasin.value = await getByColKeyAndKeyWord(
        table2,
        "user_id",
        user.value.id
      );
    };

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], "products");
          form.value.img_url = imgUrl;
        }

        if (isUpdate.value) {
          await update(table, form.value);

          notifySuccess("Updated successfully");
        } else {
          await post(table, form.value);
          notifySuccess("Saved successfully");
        }
        router.push({ name: "product" });
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
      optionsMagasin,
      img,
    };
  },
});
</script>
