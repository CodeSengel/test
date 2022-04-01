<template>
    <div class="row justify-center full-height full-width text-center">
        <div class="column " >
            <div class="row">
              <q-card  bordered class="q-pa-lg shadow-1"  >
                    <q-card-section>
                        <p> Reset password </p>
                        <q-form class="q-gutter-md" @submit.prevent="handlePasswordReset">
                            <q-input square filled label="new password" v-model="password" :type="isPwd ? 'password' : 'text'"> 
                                <template v-slot:append>
                                    <q-icon
                                      :name="isPwd ? 'visibility_off' : 'visibility'"
                                      class="cursor-pointer"
                                      @click="isPwd = !isPwd"
                                    />
                                  </template>
                            </q-input>
                            <q-input square filled label="confirm the new password" v-model="password2" type="password" /> 
                            <q-btn label="send Reset Email" color="primary" class="full-width" outline rounded @click="handlePasswordReset"/>
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
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter , useRoute} from 'vue-router'
import useNotify from 'src/composables/UseNotify'




export default defineComponent ({
    name:'handlePasswordReset',
    setup(){
        const { resetPassword } = useAuthUser()
        const router = useRouter()
        const route = useRoute()
        const token = route.query.token
        var password = ref('')
        var password2 = ref('')
        
        const {notifyError , notifySuccess} = useNotify()

        const handlePasswordReset = async () => {

            if (password.value == password2.value) {
                try {
                await resetPassword(token,password.value)
                console.log('before push')
                router.push({name:'login'})
                console.log('after push')
                notifySuccess("Password updated")
                } catch (error) {
                    notifyError(error.message)
                }
            } else { notifyError("The two passwords are not the same") }
            
            
        }

        return {
            password,
            password2,
            handlePasswordReset,
            isPwd : ref(true)
        }
    },





})

</script>






        