<template>
  <q-page>
    <div class="col">
      <q-table title="Treats" :rows="produits" :columns="columns" row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="red"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              >
              </q-btn>
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

const columns = [
  {
    name: "action",
    align: "left",
    label: "Actions",
    field: "action",
    sortable: false,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "start_date",
    align: "center",
    label: "Start date",
    field: "start_date",
    sortable: false,
  },
  {
    name: "end_date",
    align: "right",
    label: "End date",
    field: "end_date",
    sortable: false,
  },
];

export default defineComponent({
  name: "Dashboard",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const produits = ref([]);
    const newProduit = ref({
      name: "Sport",
      start_date: 20220224,
      end_date: 20220620,
    });
    const loading = ref(true);
    const { user } = useAuthUser();
    const { list, post, filter, remove } = useApi();
    const table = "timelines";

    const handleListProduit = async () => {
      try {
        loading.value = true;

        produits.value = await list(table);
        //produits.value = await filter(table, "name");
        loading.value = false;
        //console.log("Voici le produit", produits.value[0]);
        notifySuccess("Votre liste affichée");
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleAddProduit = async () => {
      try {
        await post(table, newProduit.value);
        notifySuccess("Saved successfully");
        handleListProduit();
        //notifySuccess(newProduit.name);
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleDeleteProduit = async () => {
      try {
        handleListProduit;
      } catch (error) {
        notifyError(error.message);
      }
    };
    const handleEditProduit = async (variable) => {
      try {
        notifySuccess(variable.id);
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListProduit();
    });
    return {
      user,
      loading,
      produits,
      handleListProduit,
      handleAddProduit,
      columns,
      handleEditProduit,
    };
  },
  mounted() {
    this.$q.dark.set(true);
  },
});
</script>
