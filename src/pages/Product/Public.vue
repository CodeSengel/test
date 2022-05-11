<template>
  <q-page padding>
    <q-btn onclick="history.back()"
      ><q-icon name="mdi-arrow-left-bold" size="lg" color="red"
    /></q-btn>
    <div class="row">
      <q-table
        grid
        :rows="
          products //
        "
        :columns="columnsProduct"
        row-key="name"
        class="col-12"
        :loading="loading"
        rowsPerPage="10"
        :filter="filter"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top>
          <div outline style="color: goldenrod">
            <strong>{{ magasinName }}</strong>
          </div>

          <q-space />

          <div class="row">
            <div class="col">
              <q-input
                outlined
                dense
                v-model="filter"
                debounce="1000"
                placeholder="search"
                class="q-mr-sm"
              >
                <template v-slot:append>
                  <q-icon name="mdi-magnify" />
                </template>
              </q-input>
            </div>

            <q-btn to="product-public" class="bg-primary shadow-1">
              Vers tous les produits
              <q-icon name="mdi-arrow-right-bold"></q-icon>
            </q-btn>
          </div>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <div v-ripple>
                <figcaption style="background: rgba(158, 43, 43, 0.8)">
                  <div class="text-h6 text-center">
                    {{ props.row.name }}
                  </div>
                </figcaption>
                <q-img :src="props.row.img_url" :ratio="4 / 3"> </q-img>
              </div>

              <div
                style="border-radius: 0% 30%"
                class="absolute-bottom-right q-pr-xs q-pb-xs q-gutter-xs bg-grey-10"
              >
                <q-btn
                  padding="xs"
                  flat
                  @click="
                    handleLike(
                      1,
                      props.row.id,
                      props.row.liked,
                      props.row.disliked
                    )
                  "
                  :icon="
                    props.row.liked ? 'mdi-thumb-up ' : 'mdi-thumb-up-outline'
                  "
                />

                {{ props.row.likes }}

                <q-btn
                  padding="xs"
                  flat
                  @click="
                    handleLike(
                      2,
                      props.row.id,
                      props.row.liked,
                      props.row.disliked
                    )
                  "
                  :icon="
                    props.row.disliked
                      ? 'mdi-thumb-down '
                      : 'mdi-thumb-down-outline'
                  "
                />
                {{ props.row.dislikes }}
              </div>
              <div class="absolute-top-right q-pr-xs q-py-xs">
                <strong> {{ props.row.price }} DA</strong>
              </div>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]"> </q-page-sticky>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import { columnsProduct } from "./table";
const pagination = 9;
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRoute } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";
import { v4 as uuidv4 } from "uuid";
const { user } = useAuthUser();

export default defineComponent({
  name: "PageProductPublic",

  setup() {
    const filter = ref("");

    const likeColorCondition = ref(true);
    const likeColor = ref("red");
    const products = ref([]);
    const array3 = ref([]);
    const array4 = ref([]);
    const loading = ref(true);

    const {
      listPublic,
      getByColKeyAndKeyWord,
      post,
      remove,
      countrow,
      create_test,
      sendlike,
      listProduits,
      list_with_liked,
      removelikes,
      list_with_liked_filtered,
      list_with_liked_filtered_2,
    } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const route = useRoute();
    const table = "product_tab";
    const table2 = "magasins_tab";
    const liketable = "product_likes";
    const likenumber = ref();
    const disliketable = "product_dislikes";
    const form = ref({
      user_id: "",
      product_id: "",
    });
    const test = ref({});

    const likeForm = ref({
      product_id: "",
    });

    const magasin = ref("");
    const magasinName = ref("");
    const handleListProducts = async () => {
      try {
        if (route.params.id) {
          loading.value = true;
          products.value = await list_with_liked_filtered_2(
            user.value.id,
            route.params.id
          );

          //magasin.value = await getByColKeyAndKeyWord(
          //table2,
          //"id",
          //route.params.id
          //);

          //magasinName.value = magasin.value[0].name;
          loading.value = false;
        } else {
          loading.value = true;
          const userId = user.value.id;

          products.value = await list_with_liked(user.value.id);

          magasinName.value = "Tous les produits";
          loading.value = false;
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleLike = async (val, prodId, param_liked, param_disliked) => {
      //check if prod is liked already

      if (val == 1) {
        likeForm.value.product_id = parseInt(prodId);

        await removelikes(disliketable, prodId, user.value.id);
        if (param_liked == false) {
          await post(liketable, likeForm.value);
        }
        if (param_liked == true) {
          await removelikes(liketable, prodId, user.value.id);
        }

        //await sendlike(liketable, liketable, prodId);

        //
      } else if (val == 2) {
        likeForm.value.product_id = parseInt(prodId);

        await removelikes(liketable, prodId, user.value.id);
        if (param_disliked == false) {
          await post(disliketable, likeForm.value);
        }
        if (param_disliked == true) {
          await removelikes(disliketable, prodId, user.value.id);
        }

        //await sendlike(disliketable, disliketable, prodId);
      }
      handleListProducts();
    };

    // est ce qu'on garde cette function ? ?
    const likeCounter = (product_id, val) => {
      likenumber.value = countrow("product_likes", "product_id", product_id);

      return likenumber;
    };

    onMounted(() => {
      handleLike();
      handleListProducts();
    });

    //const handleListProducts = async (userId) => {

    return {
      columnsProduct,
      products,
      magasin,
      loading,
      pagination,
      filter,
      magasinName,
      likeColorCondition,
      likeColor,
      handleLike,
      likeCounter,
    };
  },
});
</script>
