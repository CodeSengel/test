<template>
  <q-page padding>
    <span class="text-h6">
      <q-icon name="mdi-store" size="lg" />
      Souk
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
        :filter="filter"
        virtual-scroll
        v-model="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top>
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
          </div>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <div v-ripple>
                <q-img
                  :src="props.row.img_url"
                  :ratio="10 / 5"
                  @click="gotomagasin(props.row)"
                >
                  <figcaption style="background: rgba(106, 27, 154, 0.8)">
                    <strong> {{ props.row.name }} </strong>
                    {{ nombreMagasins }}
                  </figcaption>
                </q-img>
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
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageProductList",
  setup() {
    const waitTransition = 500;
    const router = useRouter();
    const route = useRoute();
    const magasis_type = ref("");
    const filter = ref("");
    const table = "magasin_type_tab";
    const magasinsList = ref([]);
    const { listPublic, handleNumberMagasin } = useApi();
    const nombreMagasins = ref("");
    const pagination = ref({
      rowsPerPage: 0,
    });

    const handleListPublicMagasin = async () => {
      try {
        magasinsList.value = await listPublic(table);
      } catch (error) {}
    };
    const gotomagasin = (magasin_type) => {
      setTimeout(() => {
        console.log("aqli da ", magasin_type);
        router.push({
          name: "product-public",
          params: { id: magasin_type.name },
        });
      }, waitTransition);
    };

    onMounted(() => {
      handleListPublicMagasin();
    });
    return {
      columnsMagasins,
      magasinsList,
      filter,
      gotomagasin,
      nombreMagasins,
      pagination,
    };
  },
});
</script>
