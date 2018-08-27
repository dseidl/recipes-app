<template>
  <Page class="page">
    <GridLayout ref='container' rows="auto, auto, *" class="list-page">
      <!-- Row 1: The custom action bar -->
      <GridLayout row="0" columns="44, *, auto" class="action-bar-custom">
        <Label col="1" text="Recipes"></Label>

        <!-- Wrap the image in a StackLayout to give it a bigger tap target -->
        <StackLayout col="2" @tap="showMenu()" class='menu-button-container'>
          <Label class="huhu" text="Lorem ipsum dolor." />
          <Image src="~/images/menu@2x.png" stretch="none" />
        </StackLayout>
      </GridLayout>
    </GridLayout>

    <Label class="huhu" text="Lorem ipsum dolor." @tap="showMenu()" />

  </Page>
</template>

<script>
import { action } from 'ui/dialogs'
import UserService from "../services/UserService";
import Login from '../components/Login'

const userService = new UserService();

export default {
  components: {
    Login
  },

  data () {
    return {
      surprise: false,
    };
  },

  methods: {
    showMenu() {
      action({
        message: "What would you like to do?",
        actions: ["Log Off"],
        cancelButtonText: "Cancel"
      }).then((result) => {
        this.logout();
      });
    },

    logout() {
      console.log('LoginService: ', userService.token);
      userService.logout()
      console.log('LoginService: ', userService.token);

      this.$navigateTo(Login)
    },
  }
};
</script>

<style lang="scss" scoped>
.list-page {
  background: tomato;

  .action-bar-custom {
    color: black;
    margin-top: 20;
    padding-top: 12;
    padding-bottom: 12;

    Label {
      font-size: 21;
      font-weight: bold;
    }

    StackLayout {
      height: 40;
      padding-left: 15;
      padding-right: 15;
      vertical-align: center;
      horizontal-align: center;
    }
  }
}
</style>
