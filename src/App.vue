<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted(){
    this.$q.dark.set(true)
  }
});
</script>
