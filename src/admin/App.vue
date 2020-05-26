<template lang="pug">
  div.root-wrapper-container
    div.root-container
      header.header-container
        app-header
      section.tabs-container
        tabs
      main.content-container
        router-view
        .about-section
          .container
            .about-page__title
              h1.page-title Блок "Обо мне"
              button.about-page__add-new(
              ) Добавить группу

          .about-page__content
            .container.container--mobile-wide
              form(@submit.prevent="addNewCategory").categories-form
                input(type="text" v-model="title")
                input(type="submit" value="Добавить")
                .error-box {{ validation.firstError('title')}}


        works

        login
            
        
</template>

<script>
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
      appHeader: () => import("./components/header"),
      tabs: () => import("./components/tabs"),
      works: () => import("./pages/works"),
      login: () => import("./pages/login"),
      skillsGroup: () => import("./components/skills-group")
    },
    data(){
      return {
        title: ''
      }
    }
  };
</script>


<style lang="pcss">
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

  .root-wrapper-container {
    height: 100%;
  }

  .header-container {
    background: linear-gradient(to right, #3e3e59, #454573);
    padding: 15px 0;

    @include phones {
      padding: 20px 0;
    }
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
    background: url("../images/content/admin.jpg") center center / cover no-repeat;
    flex: 1;
    padding-top: 60px;

    @include phones {
      padding-top: 30px;
    }
  }

  .page-title {
    margin-bottom: 60px;
    font-size: 21px;
    font-weight: bold;
  }

  .tooltips-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 110%);
    visibility: hidden;
    transition: 0.3s;

    &.showed {
      transform: translate(-50%, 0%);
      visibility: visible;
    }
  }

  button {
    background: transparent;
  }

  .section-title {
    font-size: 21px;
    line-height: 30px;
    font-weight: 700;
    margin-bottom: 0;
    margin-right: 60px;

    @include phones {
      margin-bottom: 28px;
    }
  }
</style>