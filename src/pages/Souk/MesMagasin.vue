<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="
          mesmagasins //
        "
        :columns="columnsMagasins"
        row-key="name"
        class="col-12"
        :loading="loading"
        rowsPerPage="10"
      >
        <template v-slot:top>
          <span class="text-h6"> Mes magasins </span>
          <q-btn
            label="Souk"
            dense
            size="sm"
            outline
            class="q-ml-sm"
            icon="mdi-store"
            color="primary"
            @click="handleGoToStore"
          />
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="fas fa-plus"
            :to="{ name: 'Magasin_form' }"
            dense
          />
        </template>

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar
              v-else
              color="grey"
              text-color="white"
              icon="mdi-image-off"
            >
            </q-avatar>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              outline
              icon="fas fa-pen"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>

            <q-btn
              outline
              icon="fas fa-trash"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveProduct(props.row)"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>

        <template v-slot:body-cell-produits="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              outline
              icon="mdi-view-list"
              color="info"
              dense
              size="sm"
              @click="gotoproducts(props.row)"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="fas fa-plus"
        color="primary"
        :to="{ name: 'Magasin_form' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { columnsMagasins } from "./table";
const pagination = 9;

import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { QToolbarTitle, Dialog, useQuasar } from "quasar";
import useAuthUser from "src/composables/UseAuthUser";
export default defineComponent({
  name: "PageProductList",
  setup() {
    const { user } = useAuthUser();
    const filter = ref("");
    const magasinfull = ref(false);
    const mesmagasins = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const waitTransition = 500;
    const { listPrive, remove, removemagasin } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const $q = useQuasar();
    const table = "magasins_tab";
    const handleListMagasins = async () => {
      try {
        loading.value = true;
        mesmagasins.value = await listPrive(table, user.value.id);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };
    const handleEdit = (category) => {
      router.push({ name: "Magasin_form", params: { id: category.id } });
    };
    const gotoproducts = (magasin_type) => {
      setTimeout(() => {
        router.push({
          name: "product-public",
          params: { id: magasin_type.id },
        });
      }, waitTransition);
    };
    const handleRemoveProduct = async (category) => {
      try {
        $q.dialog({
          title: "confirm",
          message: "Do you really want to delete " + category.name,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          magasinfull.value = await removemagasin(table, category.id);
          if (magasinfull.value) {
            notifyError("le magasin contient des produits");
          } else {
            notifySuccess("Deleted successfully"), handleListMagasins();
          }
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGoToStore = () => {
      router.push({
        name: "product-public",
      });
    };

    onMounted(() => {
      handleListMagasins();
    });
    return {
      columnsMagasins,
      mesmagasins,
      loading,
      handleEdit,
      handleRemoveProduct,
      pagination,
      filter,
      handleGoToStore,

      gotoproducts,
    };
  },
});
</script>
