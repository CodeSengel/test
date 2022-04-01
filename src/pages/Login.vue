<template>
  <div class="row justify-center full-height full-width text-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md text-center">OneGantt</h5>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="handleLogin">
              <q-input
                square
                filled
                clearable
                v-model="form.email"
                type="email"
                label="email"
                autocomplete="on"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Email is required',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.password"
                type="password"
                label="password"
                aria-autocomplete="current-password"
                autocomplete="on"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Password is required',
                ]"
              />
              <q-card-actions class="q-px-md q-gutter-md">
                <q-btn
                  unelevated
                  color="purple-5"
                  size="lg"
                  class="full-width"
                  type="submit"
                  label="Login"
                />
                <q-btn
                  unelevated
                  color="blue"
                  size="sm"
                  class="full-width"
                  label="Forgot password"
                  :to="{ name: 'forgot-password' }"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>

          <p class="q-pt-lg text-grey-6">you don't have an account ?</p>
          <q-btn
            size="sm"
            bordered
            class="shadow-1"
            label="Create an account"
            to="/registration"
          >
          </q-btn>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useNotify from "src/composables/UseNotify";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageLogin",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      if (form.value.password == null || form.value.email == null) {
        notifyError("Email and Password are required ");
      } else {
        try {
          await login(form.value);
          router.push({ name: "me" });
          notifySuccess("welcome");
        } catch (error) {
          notifyError(error.message);
        }
      }
    };
    return {
      form,
      handleLogin,
    };
  },

  mounted() {
    this.$q.dark.set(true);
  },
});
</script>
