<template>
  <Page>
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/images/logo.png" />
        <Label class="header" text="Recipes" />

        <StackLayout class="input-field" marginBottom="25">
          <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email" returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
          <StackLayout class="hr-light" />
        </StackLayout>

        <StackLayout class="input-field" marginBottom="25">
          <TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'" @returnPress="focusConfirmPassword" fontSize="18" />
          <StackLayout class="hr-light" />
        </StackLayout>

        <StackLayout v-show="!isLoggingIn" class="input-field">
          <TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" v-model="user.confirmPassword" returnKeyType="done" fontSize="18" />
          <StackLayout class="hr-light" />
        </StackLayout>

        <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary m-t-20" />
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'" />
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Recipes from "./Recipes";
import UserService from "../services/UserService";

const userService = new UserService();

export default {
  components: {
    Recipes,
  },

  data() {
    return {
      isLoggingIn: true,
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      userService.login(this.user)
        .then(() => {
          // this.alert("You successfully logged in.");

          this.$navigateTo(HelloWorld);
        })
        .catch(() => {
          this.alert("Unfortunately we could not find your account.");
        });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }

      userService.register(this.user)
        .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.alert("Unfortunately we were unable to create your account.");
        });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "Recipes",
        okButtonText: "OK",
        message: message
      });
    }
  },

  mounted() {
    console.log('LOGIN mounted')
  }
}
</script>

<style lang="scss">

</style>
