<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="
          products //
        "
        :columns="columnsProduct"
        row-key="name"
        class="col-12"
        :loading="loading"
        rowsPerPage="10"
      >
        <template v-slot:top>
          <span class="text-h6"> Mes produits </span>
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
            :to="{ name: 'form-product' }"
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
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="fas fa-plus"
        color="primary"
        :to="{ name: 'form-product' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { columnsProduct } from "./table";
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
    const products = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const { listPrive, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const $q = useQuasar();
    const table = "product_tab";
    const handleListProducts = async () => {
      try {
        loading.value = true;
        products.value = await listPrive(table, user.value.id);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };
    const handleEdit = (category) => {
      router.push({ name: "form-product", params: { id: category.id } });
    };
    const handleRemoveProduct = async (category) => {
      try {
        $q.dialog({
          title: "confirm",
          message: "Do you really want to delete " + category.name,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(table, category.id);
          notifySuccess("Deleted successfully"), handleListProducts();
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
      handleListProducts();
    });
    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveProduct,
      pagination,
      filter,
      handleGoToStore,
    };
  },
});
</script>
