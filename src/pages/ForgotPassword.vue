<template>
    <div class="row justify-center full-height full-width text-center">
        <div class="column " >
            <div class="row">
              <q-card  bordered class="q-pa-lg shadow-1"  >
                    <q-card-section>
                        
                        <q-form class="q-gutter-md" @submit.prevent="handleForgotPassword">
                            <q-input label="Your email" square filled clearable v-model="email" type="email"/>
                            <q-btn label="send Reset Email" color="primary" class="full-width" outline  rounded @click="handleForgotPassword"/>
                            <q-btn label="Back" color="primary" class="full-width" flat rounded :to="{ name: 'login'}"/>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>



</template>

<script>

import {defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
const $q = useQuasar()


export default defineComponent ({
    setup(){
        const {sendPasswordRestEmail} = useAuthUser()

        const {notifyError , notifySuccess} = useNotify()
        
        const email = ref ('')
        
       

        const handleForgotPassword = async () => {

            try {
                console.log("voici l'email", email.value)
                await sendPasswordRestEmail(email.value)
            
                notifySuccess ('password reset email sent to : ' + email.value)
            } catch (error) {
                notifyError( error.message)
                
            }

        }
        return {
            email,
            handleForgotPassword
        }
    },





})

</script>