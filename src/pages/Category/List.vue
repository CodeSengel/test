<template>
  <q-page padding>
    <div>Voici ton tableau de bord</div>

    <div class="row">
      <q-table
        :rows="
          categories //
        "
        :columns="columnsCategory"
        row-key="name"
        class="col-12"
        :loading="loading"
        rowsPerPage="10"
      >
        <template v-slot:top>
          <span class="text-h6"> Category </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="fas fa-plus"
            :to="{ name: 'form-dashboard' }"
            dense
          />
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
              @click="handleRemoveCategory(props.row)"
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
        :to="{ name: 'form-dashboard' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { columnsCategory } from "./table";
const pagination = 9;

import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { QToolbarTitle, Dialog, useQuasar } from "quasar";
export default defineComponent({
  name: "PageCategoryList",
  setup() {
    const categories = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const $q = useQuasar();
    const table = "category";
    const handleListCategories = async () => {
      try {
        loading.value = true;
        categories.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };
    const handleEdit = (category) => {
      router.push({ name: "form-dashboard", params: { id: category.id } });
    };
    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: "confirm",
          message: "Do you really want to delete " + category.name,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(table, category.id);
          notifySuccess("Deleted successfully"), handleListCategories();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };
    onMounted(() => {
      handleListCategories();
    });
    return {
      columnsCategory,
      categories,
      loading,
      handleEdit,
      handleRemoveCategory,
      pagination,
    };
  },
});
</script>
