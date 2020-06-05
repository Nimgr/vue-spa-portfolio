<template lang="pug">
  div.root-wrapper-container
    div.root-container
      template(v-if="$route.meta.login")
        .login
          router-view
      template(v-else)
        .admin
          header.header-container
            app-header
          section.tabs-container
            tabs
          main.content-container
            router-view
            //about
            //reviews
            //works            
        
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    'title': function (value) {
      return Validator.custom(function () {
        if (value.length < 3) {
          return 'Не менее 3 символов'
        }
      });
    }
  },

  components: {
    about: () => import("./components/pages/about"),
    reviews: () => import("./components/pages/reviews"),
    works: () => import("./components/pages/works"),
    appHeader: () => import("./components/header"),
    tabs: () => import("./components/tabs")
  }
};
</script>


<style lang="pcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

  button {
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  border-style: solid;
  border-width: 1px;
  background-color: buttonface;
}
.root-wrapper-container {
  height: 100%;
}
.header-container {
  background: linear-gradient(to right, #3e3e59, #454573);
  padding: 15px 0;
  /* @include phones {
    padding: 20px 0;
  } */
}
.root-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.admin-wrapper {
  display: flex;
}

.maincontent {
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

.content-container {
  background: url("../images/content/admin.jpg") center center no-repeat / cover;
  flex: 1;
  padding-top: 60px;
    /* @include phones {
      padding-top: 30px;
    } */
}
.page-title {
  margin-bottom: 60px;
  font-size: 21px;
  font-weight: bold;
}
</style>