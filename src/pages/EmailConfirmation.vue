<template>

  <div class="row justify-center full-height full-width text-center">
    <div class="column " >
        <div class="row">
          <q-card  bordered class="q-pa-lg shadow-1"  >
            <q-card-section>
              <p class="text-body1">
                Thanks for registration
              </p>
              <p class="text-body1">
                Please confirm your email to finish your registration :
                <br> <strong> {{$route.query.email}}  </strong> 
              
              </p>
              <div class="row justify-center full-height full-width text-center">
                <div class="column " >
                  <q-btn unelevated color="purple-5" size="lg" class="full-width"  to="/login" label="login" />
                </div>
              </div>
            </q-card-section>
          </q-card>
            </div>
          </div>
        </div>
    
   
    
 
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
