<template lang="pug">
  div.root-wrapper-container
    div.root-container
      header.header-container
        app-header
      section.tabs-container
        tabs
      main.content-container
        router-view
        .about-page
          .container
            .about-page__title
              h1.section-title Блок "Обо мне"
              button.about-page__add-new Добавить группу

          .about-page__content
            .container.container--mobile-wide
              .about-list
                .about-list__item
                  .about-card
                    form.about-card__title
                      .about-card__title-input
                        input.about-card__title-input--edit(placeholder="Название новой группы")
                      .about-card__title-btns
                        .about-card__title-btn
                          button.btn.is-icon.is-tick
                        .about-card__title-btn
                          button(type="button").btn.is-icon.is-cross
                    .about-card__content
                      .skill-add
                        form.skill-add__form
                          .skill-add__inputs
                            .skill-add__input--name
                              input.input__elem(placeholder="Новый навык")
                            .skill-add__input--percent
                              input.input__elem(placeholder="100")
                          button(type="button").skill-add__button(data-text="+")
                .about-list__item
                  .about-card
                    .about-card__title
                      .about-card__title-input
                        .about-card__title
                      .about-card__title-btns
                        .about-card__title-btn
                          button.btn.is-icon.is-tick
                        .about-card__title-btn
                          button(type="button").btn.is-icon.is-cross

                    .about-card__content
                      .about-skills

                        .about-skill
                          .about-skill__title
                          .about-skill__value
                          .about-skill__btns
                            .about-skill__btn
                              button(type="button").btn.is-icon.is-pencil
                            .about-skill__btn
                              button(type="button").btn.is-icon.is-trash

                        .about-skill
                          input(
                            type="text"
                            placeholder="Название"
                          ).about-skill__title.about-skill__title--input
                          input(
                            type="text"
                            placeholder="Проценты"
                          ).about-skill__value.about-skill__value--input
                          .about-skill__btns
                            .about-skill__btn
                              button(type="button").btn.is-icon.is-tick
                            .about-skill__btn
                              button(type="button").btn.is-icon.is-cross
                              
                      .skill-add
                        form.skill-add__form
                          .skill-add__inputs
                            .skill-add__input--name
                              input.input__elem(placeholder="Новый навык")
                            .skill-add__input--percent
                              input.input__elem(placeholder="100")
                          button(type="button").skill-add__button(data-text="+")

              form(@submit.prevent="addNewCategory").categories-form
                input(type="text" v-model="title")
                input(type="submit" value="Добавить")
                .error-box {{ validation.firstError('title')}}

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
      works: () => import("./components/pages/works"),
      login: () => import("./components/pages/login"),
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

  .about-page__title {
    display: flex;
    align-items: center;
    margin-bottom: 60px;

    @include phones {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .about-page__add-new {
    color: $links-color;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0;

    &:before {
      content: "+";
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-image: linear-gradient(to right, #006aed, #3f35cb);
      line-height: 20px;
      color: #fff;
      margin-right: 13px;
      flex-shrink: 0;
      flex-basis: 20px;
    }
  }

  .about-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;

    @include phones {
      margin-left: 0;
    }

    &__item {
      width: calc(100% / 2 - 30px);
      margin-left: 30px;
      margin-bottom: 30px;
    }
  }

  .about-card {
    position: relative;
    height: 100%;
    padding: 30px;
    box-shadow: 4px 3px 20px 0 rgba(0, 0, 0, 0.07);
    background-color: #ffffff;
  }
  .skill-add {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  .about-card {
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      font-size: 18px;
      line-height: 2;
      font-weight: 600;

      &-input {
        width: 60%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.9);

        &--edit {
          width: 100%;
          border: 0;
          line-height: 2;

          &::placeholder {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0,0,0,.5);
          }
        }

        &-error {
          position: absolute;
          content: 'Ошибка';
          color: #fff;
          background: #red;
          font-size: 15px;
          line-height: 1;
          width: 230px;
          height: 40px;
          margin: 0 0 10px 230px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          top: 29px;
        }
      }

      &-btns {
        display: flex;
        flex-flow: row nowrap;
      }
      &-btn {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0;

    &.is-icon {
      &:after {
        content: "";
        width: 13px;
        height: 18px;
        display: block;
        background: svg-load("../images/icons/tick.svg") center center no-repeat / contain;
      }
    }

    &.is-tick {
      &:after {
        background: svg-load("tick.svg") center center no-repeat / contain;
      }
    }

    &.is-cross {
      &:after {
        background: svg-load("cross.svg") center center no-repeat / contain;
      }
    }
  }

  .skill-add {
    &__form {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-left: 18%;

      &.blocked {

      }
    }

    &__inputs {
      display: flex;
    }

    &__input {
      &--name {
        margin-right: 10px;
      }

      &--percent {
        position: relative;
        width: 70px;

        &:after {
          content: '%';
          position: absolute;
          top: 3px;
          right: 10px;
          opacity: 0.7;
          font-family: OpenSans;
          font-size: 16px;
          line-height: 2;
          color: rgba(65, 76, 99, 0.7);
        }
      }
    }

    &__button {
      width: 2.5rem;
      height: 2.5rem;
      position: relative;
      padding: 0;
      background: linear-gradient(90deg,#006aed 0,#3f35cb) 50%;
      border-radius: 50%;
      overflow: hidden;
      display: block;
      margin-left: 2.125rem;
      flex-shrink: 0;
      cursor: pointer;

      &:before {
        content: attr(data-text);
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 1.875rem;
        color: #fff;
        font-weight: 600;
        line-height: 2.5rem;
      }
    }
  }

  .input__elem {
    width: 100%;
    padding: 0.625rem 8%;
    border: none;
    border-bottom: 1px solid #1f232d;

    &::placeholder {
      color: rgba(0,0,0,.5);
    }

    &--error {
      border-bottom: 1px solid red;

      &::placeholder {
        color: rgba(255,0,0,.5);
      }
    }
  }

  .about {
    &-skills {
      padding: 30px 0;
      margin-bottom: 30px;
    }

    &-skill {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      &__title {
        width: 55%;

        &--input {
          border: none;
          border-bottom: 1px solid rgba(0,0,0,.9);
        }
      }

      &__value {
        width: 20%;

        &--input {
          border: none;
          border-bottom: 1px solid rgba(0,0,0,.9);
        }
      }

      &__btns {
        width: 15%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
      }

      &__btn {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0;

    &.is-icon {
      &:after {
        content: "";
        width: 13px;
        height: 18px;
        display: block;
        background: svg-load("tick.svg") center center no-repeat / contain;
        opacity: .6;
      }
    }

    &.is-pencil {
      &:after {
        background: svg-load("pencil.svg") center center no-repeat / contain;
      }
    }

    &.is-trash {
      &:after {
        background: svg-load("trash.svg") center center no-repeat / contain;
      }
    }

    &.is-tick {
      &:after {
        background: svg-load("tick.svg") center center no-repeat / contain;
      }
    }

    &.is-cross {
      &:after {
        background: svg-load("cross.svg") center center no-repeat / contain;
      }
    }
  }

  .skill-add {
    &__form {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-left: 18%;

      &.blocked {

      }
    }

    &__inputs {
      display: flex;
    }

    &__input {
      &--name {
        margin-right: 10px;
      }

      &--percent {
        position: relative;
        width: 70px;

        &:after {
          content: '%';
          position: absolute;
          top: 3px;
          right: 10px;
          opacity: 0.7;
          font-family: OpenSans;
          font-size: 16px;
          line-height: 2;
          color: rgba(65, 76, 99, 0.7);
        }
      }
    }

    &__button {
      width: 2.5rem;
      height: 2.5rem;
      position: relative;
      padding: 0;
      background: linear-gradient(90deg,#006aed 0,#3f35cb) 50%;
      border-radius: 50%;
      overflow: hidden;
      display: block;
      margin-left: 2.125rem;
      flex-shrink: 0;
      cursor: pointer;

      &:before {
        content: attr(data-text);
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 1.875rem;
        color: #fff;
        font-weight: 600;
        line-height: 2.5rem;
      }
    }
  }

  .input__elem {
    width: 100%;
    padding: 0.625rem 8%;
    border: none;
    border-bottom: 1px solid #1f232d;

    &::placeholder {
      color: rgba(0,0,0,.5);
    }

    &--error {
      border-bottom: 1px solid red;

      &::placeholder {
        color: rgba(255,0,0,.5);
      }
    }
  }

  .works {
    margin-bottom: 50px;

    &-page__title {
      display: flex;
      align-items: center;
      margin-bottom: 60px;

      @include phones {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__items {
      display: flex;
      flex-flow: row wrap;
      justify-content: baseline;
    }

  }
</style>