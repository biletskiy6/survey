<template>
    <div>
        <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
                <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                    <input v-model="email" type="email">
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                    <input v-model="password" type="text">
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>

                <vs-button @click="onSubmit" :disabled="invalid" type="filled">Disabled</vs-button>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    export default {
        layout: "empty",
        data: () => ({
            email: "",
            password: "",
        }),
        methods: {
            async onSubmit() {

               try {
                   const formData = {
                       email: this.email,
                       password: this.password
                   };

                   await this.$store.dispatch("auth/login", formData);
                   this.$router.push('/');

               } catch (e) {

               }
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver
        },
    }
</script>
