<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-purple-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div style="width: 100%">
            <div
              class="text-h5 q-my-none"
              style="position: relative; width: 60%"
            >
              SOUKiw
            </div>
          </div>
        </q-toolbar-title>
        <div class="q-pr-xl">
          <q-badge color="purple-9" text-color="white" class="q-ma-md">
            {{ todaysDate }}
          </q-badge>
        </div>
        <div>v1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list v-if="user">
        <div class="relative q-px-xl q-pt-xl">
          <q-avatar square size="200px">
            <img src="~assets/appIcon.png" />
          </q-avatar>
        </div>
        <div>
          <p class="text-h6 q-my-none" style="text-align: center">
            {{ user.user_metadata.name }}
          </p>
          <p class="text-h10 q-pb-xs q-my-none" style="text-align: center">
            {{ user.user_metadata.role }}
          </p>
          <p class="text-h10 q-pb-lg q-my-none" style="text-align: center">
            {{ user.email }}
          </p>
        </div>

        <div>
          <div v-if="userCheck">
            <Dash v-for="to in dash" :key="to.title" v-bind="to" />
          </div>

          <EssentialLink
            v-for="to in essentialLinks"
            :key="to.title"
            v-bind="to"
          />
          <div
            v-if="
              user.id == '4f93a842-0e53-4e9d-a080-da56e3f0792b' ||
              user.id == '77684a4c-26d2-4fcf-9d06-b1c1e49b186d' ||
              user.id == '9a7226f3-2be6-40d2-8d1a-f609faa776c9'
            "
          >
            <dash v-for="link in dash" :key="link.title" v-bind="link" />
          </div>

          <LinkLogout
            v-for="link in linkout"
            :key="link.title"
            v-bind="link"
            @click="handleLogout"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import LinkLogout from "components/LinkLogout.vue";
import Dash from "components/Dash.vue";
import { defineComponent, ref, onMounted } from "vue";
import { date } from "quasar";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useApi from "src/composables/UseApi";

const linkout = [
  {
    title: "Logout",
    caption: "Logout your account",
    icon: "fas fa-sign-out-alt",
  },
];

const dash = [
  {
    title: "Mes produits",
    caption: "Voir tous nos produits",
    icon: "fas fa-sign-out-alt",
    to: "/product",
  },
];

const linksList = [
  {
    title: "Profile",
    caption: "See your profile",
    icon: "far fa-user",

    to: "/me",
  },

  //{
  //title: "Mes magasins",
  // caption: "Voir tous mes magasins",
  // icon: "mdi-archive",

  // to: "/mesmagasin",
  //},
  //{
  // title: "Mes produits",
  // caption: "Voir tous mes produits",
  // icon: "mdi-archive",

  //to: "/product",
  //},

  //{
  // title: "Souk",
  //caption: "Aller au souk",
  // icon: "mdi-store",

  //to: "/magasin_type",
  //},
  {
    title: "Souk",
    caption: "Aller au souk",
    icon: "mdi-store",

    to: "/magasin_type_2",
  },
];

export default defineComponent({
  name: "MainLayout",

  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
  },

  components: {
    EssentialLink,
    LinkLogout,
    Dash,
  },

  setup() {
    const { getByColKeyAndKeyWord, list } = useApi();
    const tempo = ref();
    const { user } = useAuthUser();
    const userCheck = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const { logout } = useAuthUser();
    const leftDrawerOpen = ref(false);

    const checkUserFunc = async () => {
      //tempo.value = await list("product_tab");
      tempo.value = await getByColKeyAndKeyWord("user_role", "amount", "2");
    };

    onMounted(() => {
      checkUserFunc();
      console.log("Voici le user", tempo);
    });

    const handleLogout = async () => {
      $q.dialog({
        title: "Logout",
        message: "Do you really want to leave ?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.push({ name: "login" });
      });
    };

    return {
      handleLogout,
      user,
      essentialLinks: linksList,
      linkout: linkout,
      dash: dash,
      userCheck,

      leftDrawerOpen,
      tempo,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
