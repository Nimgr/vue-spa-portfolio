<template lang="pug">
  form.form
    input(type="text" placeholder="Login" v-model="user.login")
    input(type="password" placeholder="password" v-model="user.password")
    button(type="submit") LogIn

  body
    .wrapper
      .maincontent
        section.about
          .container.about__container
            header.header
              .header__top
                .about__user
                  .user__avatar
                    img(src=require("images/content/Aigor.jpg")).user__avatar-pic
                  .user__name Игорь Немгиров
                .adm__panel
                  h2 Панель администрирования
                a(href="").quit__btn Выйти
              .header__bottom
                .header__menu
                  nav.nav
                  - var menu = ['Обо мне', 'Работы', 'Отзывы']
                  ul.nav__list
                    each item in menu
                      li.nav__item
                        a(href="").nav__link #item

            .about__block
              .head__part
                .block__title
                  h1 Блок "Обо мне"
                .add__btn
                  button.add__btn-group
                  .button__name Добавить группу
              .about__wrapper
                .about__groups
                  ul.groups__list
                    li.groups__item
                      tr
                      tr
                      tr
                      tr
                      tr
                    li.groups__item
                      tr
                    li.groups__item
                      tr

        section.works
          container.works__container
            .works__block
              .head__part
                .block__title
                  h2 Блок "Работы"
              .works__wrapper
                .works__collection
                  .edit__work
                    h3 Редактирование работы
                    .edit__content
                      .edit__content-left
                      .edit__content-right
                  .works__preview
                    .works__add
                    ul.works__list
                      li.works__item

        section.reviews
          container.reviews__container
            .reviews__block
              .head__part
                .block__title
                  h2 Блок "Отзывы"
              .reviews__wrapper
                .reviews__collection
                  .reviews__new
                    h3 Новый отзыв
                    .reviews__content
                      .reviews__content-left
                      .reviews__content-right
                  .reviews__preview
                    .reviews__add
                    ul.reviews__list
                      li.reviews__item
               
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    'user.login': function (value) {
      return Validator.custom(function() {
        if (value.length < 5) {
          return 'Не менее 5 символов'
        }
      });
    },
    'user.password': function (value) {
      return Validator.custom(function() {
        if (value.length < 8) {
          return 'Не менее 8 символов'
        }
      });
    },
  }
}
</script>

<style lang="postcss">

</style>

