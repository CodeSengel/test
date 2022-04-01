<template>
  <div class="row justify-center full-height full-width text-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md text-center">OneGantt</h5>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="handleRegister">
              <q-input
                square
                filled
                clearable
                v-model="form.name"
                type="name"
                label="name"
                autocomplete="on"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Name is required',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.role"
                type="role"
                label="role"
                autocomplete="on"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Role is required',
                ]"
              />
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
                autocomplete="off"
                lazy-rules
                :rules="[
                  (val) => (val && val.length >= 6) || 'Minimum 6 characters ',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.password2"
                type="password"
                label="confirm password"
                autocomplete="off"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Condirm the password ',
                ]"
              />

              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="purple-5"
                  size="lg"
                  class="full-width"
                  type="submit"
                  label="register"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>

          <p class="q-pt-lg text-grey-6">have already an account ?</p>
          <q-btn
            bordered
            class="shadow-1"
            label="Login"
            :to="{ name: 'login' }"
          >
          </q-btn>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

import useAuthUser from "src/composables/UseAuthUser";
import UseNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const { register } = useAuthUser();

    const { notifySuccess, notifyError } = UseNotify();

    const form = ref({
      name: "",
      email: "",
      role: "",
      password: "",
      password2: "",
    });

    const handleRegister = async () => {
      if (form.value.password == form.value.password2) {
        try {
          await register(form.value);

          router.push({
            name: "email-confirmation",
            query: { email: form.value.email },
          });
        } catch (error) {
          notifyError(error.message);
        }
      } else {
        notifyError("The two passwords have to be equal");
      }
    };

    return {
      form,
      handleRegister,
    };
  },

  mounted() {
    this.$q.dark.set(true);
  },
});
</script>
