<template>
  <q-page padding>
    <q-btn onclick="history.back()"
      ><q-icon name="mdi-arrow-left-bold" size="lg" color="red"
    /></q-btn>
    <span class="text-h6">
      <q-icon name="mdi-store" size="lg" />
      Magasins
    </span>
    <div class="col-10">
      <q-table
        grid
        :rows="
          magasinsList //
        "
        :columns="columnsMagasins"
        row-key="name"
        class="col-10"
        rowsPerPage="10"
        :filter="filter"
      >
        <template v-slot:top>
          <div></div>
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

            <q-btn @click="gotomagasin()" class="bg-primary">
              voir tous les produits
              <q-icon name="mdi-arrow-right-bold"></q-icon>
            </q-btn>
          </div>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <div v-ripple>
                <q-img
                  :src="props.row.img_url"
                  :ratio="10 / 5"
                  debounce="5000"
                  @click="gotoproducts(props.row)"
                >
                  <figcaption
                    style="
                      text-align: center;
                      background: rgba(106, 27, 154, 0.8);
                    "
                  >
                    <strong> {{ props.row.name }} </strong>
                  </figcaption>
                </q-img>
                <figcaption
                  style="text-align: center; background: rgba(109, 7, 26, 1)"
                >
                  <div class="row">
                    <div class="col-offset-4/3">
                      <q-icon name="mdi-map-marker" size="xs" />
                    </div>
                    <div class="col-offset-4/3">
                      <strong> {{ props.row.zone }} </strong>
                    </div>
                    <div class="col">Créé par : {{ props.row.owner }}</div>
                  </div>
                </figcaption>
              </div>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { columnsMagasins } from "./table";
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageProductList",
  setup() {
    const $q = useQuasar();
    const waitTransition = 500;
    const test = ref("");
    const router = useRouter();
    const route = useRoute();
    const magasin_type = ref("");
    const filter = ref("");
    const tout_magasin = "false";

    const table = "magasins_tab";
    const magasinsList = ref([]);
    const { listPublic, getByColKeyAndKeyWord, getNumberRows } = useApi();

    const gotomagasin = async () => {
      router.push({ name: "product-public" });
    };

    const handleListPublicMagasin = async () => {
      try {
        if (route.params.id) {
          magasinsList.value = await getByColKeyAndKeyWord(
            table,
            "type_id",
            route.params.id
          );
        } else {
          magasinsList.value = await listPublic(table);
        }
      } catch (error) {}
    };
    const gotoproducts = (magasin_type) => {
      setTimeout(() => {
        router.push({
          name: "product-public",
          params: { id: magasin_type.id },
        });
      }, waitTransition);
    };

    onMounted(() => {
      handleListPublicMagasin();
      console.log("voici l'id ", route.params.id);
      console.log("voici les magasins ", magasinsList);
    });
    return {
      columnsMagasins,
      magasinsList,
      filter,
      gotoproducts,
      gotomagasin,
    };
  },
});
</script>
