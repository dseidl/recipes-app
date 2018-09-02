<template>
  <Page>
    <FlexboxLayout class="page">
      <!-- Row 1: The custom action bar -->
      <FlexboxLayout class="app-bar">
        <!-- <Label text="Recipes"></Label> -->
        <Image class="app-bar__logo" src="~/images/logo-white.png" />

        <!-- Wrap the image in a StackLayout to give it a bigger tap target -->
        <StackLayout @tap="showMenu()" class='menu-button-container'>
          <Image src="res://menu" stretch="none" />
        </StackLayout>
      </FlexboxLayout>

      <ListView
        for="recipe in recipes"
        class="list-group recipes-list"
        @itemTap="onItemTap"
        @loadMoreItems="onLoadMoreItems"
      >
        <v-template>
          <StackLayout orientation="horizontal" class="list-group-item">
            <StackLayout>
              <Label class="list-group-item-heading" :text="recipe.name" textWrap="true" />
              <!-- <Label class="list-group-item-text" :text="recipe.description" textWrap="true" /> -->
            </StackLayout>
          </StackLayout>
        </v-template>
      </ListView>

      <ActivityIndicator :busy="isLoading"></ActivityIndicator>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { action } from 'ui/dialogs'
import UserService from "../services/UserService";
import RecipeService from "../services/RecipeService";
import Login from '../components/Login'

const userService = new UserService();
const recipeService = new RecipeService();

export default {
  components: {
    Login
  },

  data () {
    return {
      isLoading: false,
      page: 1,
      recipes: [],
    };
  },

  created() {
    this.fetchItems();
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

    refresh() {
      this.recipes = []
      this.page = 1
      this.fetchItems()
    },

    fetchItems() {
      if (this.isLoading) {
        return;
      }

      // console.log(this.isLoading, 'loading before');
      // this.isLoading = true;
      // console.log(this.isLoading, 'loading after');

      recipeService.fetchItems(this.page)
        .then((response) => {
          response.data.forEach(item => {
            this.recipes.push(item);
          });

          console.log(this.page);
          this.page++;
          this.isLoading = false;
          // console.log(this.isLoading, 'loading in then callback', this.recipes);
        })
        .catch(() => {
          this.alert('Unfortunately we could not load the recipes.');
        });
    },

    onItemTap(e) {
      console.log('recipe is tapped!');
    },

    onLoadMoreItems(e) {
      console.log('Loading more items')

      return this.fetchItems();
    },

    logout() {
      userService.logout()
      this.$navigateTo(Login)
    },
  }
};
</script>
