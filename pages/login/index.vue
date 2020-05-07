<template>
  <div class="auth-page">
    <div class="empty-layout-wrapper">
      <div class="form">
        <div class="form-top">
          <h2>
            Hello!
          </h2>
          <p>Sign up to your account</p>
        </div>

        <form novalidate @keyup.enter="onSubmit">
          <div class="form-input-group">
            <div class="form-input-wrapper">
              <input
                id="email"
                placeholder="Email"
                :class="{
                  invalid:
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email)
                }"
                v-model.trim="$v.email.$model"
                type="email"
              />
              <vs-icon icon="drafts" />
            </div>

            <div class="helper-text helper-text--error">
              <p v-show="$v.email.$dirty && !$v.email.required">
                The email field is required!
              </p>
              <p v-show="$v.email.$dirty && !$v.email.email">
                The input must be a proper email!
              </p>
            </div>
          </div>

          <div class="form-input-group">
            <div class="form-input-wrapper">
              <input
                placeholder="Password"
                :class="{
                  invalid: $v.password.$dirty && !$v.password.required
                }"
                v-model.trim="$v.password.$model"
                :type="isPasswordInput"
              />
              <vs-icon icon="vpn_keys" />
              <vs-icon
                @click="handleVisibilityPassword"
                class="visibility-icon"
                icon="visibility"
              />
            </div>
            <div class="helper-text helper-text--error">
              <p v-show="$v.password.$dirty && !$v.password.required">
                The password field is required!
              </p>
            </div>
          </div>

          <div class="form-submit">
            <vs-button :disabled="loading" @click="onSubmit" type="gradient"
              >Sign in</vs-button
            >
          </div>
        </form>

        <small class="auth-footer">
          <span>Dont have an account?</span>
          <nuxt-link to="register">Create</nuxt-link>
        </small>
      </div>
      <div class="description">
        <h2>Welcome back!</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
          rem cumque eum ipsam consequatur sapiente nam ducimus iste ad saepe
          facilis tempore laborum a inventore, itaque distinctio ipsa doloremque
          amet?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, between } from 'vuelidate/lib/validators';
export default {
  layout: 'empty',
  data: () => ({
    email: '',
    password: '',
    isPasswordToggle: false,
    loading: false
  }),
  computed: {
    isPasswordInput() {
      return this.isPasswordToggle ? 'text' : 'password';
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    handleVisibilityPassword() {
      this.isPasswordToggle = !this.isPasswordToggle;
    },
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.loading = true;

      try {
        const formData = {
          email: this.email,
          password: this.password
        };

        await this.$store.dispatch('auth/login', formData);

        this.$router.push('/');
      } catch (e) {
      } finally {
        this.loading = false;
      }
    }
  },
  components: {}
};
</script>
