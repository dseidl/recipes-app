<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <!-- Row 1: The custom action bar -->
      <FlexboxLayout class="app-bar" flexDirection="row" justifyContent="space-between">
        <FlexboxLayout>
          <Image class="app-bar__logo" src="~/images/logo-white.png" />
        </FlexboxLayout>

        <FlexboxLayout @tap="showMenu()" class='' paddingTop="10">
          <Image src="res://menu" class="app-bar__dots" stretch="none" />
        </FlexboxLayout>
      </FlexboxLayout>

      <ListView
        for="(recipe, index) in recipes"
        :key="index"
        class="list-group recipes-list"
        flexGrow="2"
        @itemTap="onItemTap"
        @loadMoreItems="onLoadMoreItems"
      >
        <v-template>
          <StackLayout orientation="horizontal" class="list-group-item">
            <StackLayout>
              <Label class="list-group-item-heading" :text="recipe.title" textWrap="true" />
              <!-- <Label class="list-group-item-text" :text="recipe.description" textWrap="true" /> -->
              <StackLayout orientation="horizontal" marginTop="10">
                <StackLayout>
                  <Image
                    v-if="recipe.isMeat == true"
                    class="recipes-list__icon"
                    src="res://meat"
                  />
                </StackLayout>
                <StackLayout>
                  <Image
                    v-if="recipe.isVegetarian == true"
                    class="recipes-list__icon test"
                    src="res://vegetarian"
                  />
                </StackLayout>
                <StackLayout>
                  <Image
                    v-if="recipe.isVegan == true"
                    class="recipes-list__icon test"
                    src="res://vegan"
                  />
                </StackLayout>
                <StackLayout>
                  <Image
                    v-if="recipe.isFish == true"
                    class="recipes-list__icon test"
                    src="res://fish"
                  />
                </StackLayout>
                <StackLayout>
                  <Image
                    v-if="recipe.isLactoseFree == true"
                    class="recipes-list__icon test"
                    src="res://lactosefree"
                  />
                </StackLayout>
                <StackLayout>
                  <Image
                    v-if="recipe.isGlutenFree == true"
                    class="recipes-list__icon test"
                    src="res://glutenfree"
                  />
                </StackLayout>
              </StackLayout>
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

          // console.log('page: ' + this.page);
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
