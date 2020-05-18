<template lang="pug">
  .content
    .about
      .container.about__container
        header.header
          .header__top
            .header__top-left
              .user__avatar
                img(src="../images/content/Aigor.jpg").user__avatar-pic
              .user__name Игорь Немгиров
            .header__top-right
              .adm__panel
                .adm__panel-title Панель администрирования
              button(type="button").logout Выйти
          .header__bottom
            .header__menu
              ul.tab__list
                li.tab__item
                  button(type="button").btn Обо мне
                li.tab__item
                  button(type="button").btn Работы
                li.tab__item
                  button(type="button").btn Отзывы

      .block-about
        .container.block-about__container
          .block-about__title
            h1.block-about__title-main Блок "Обо мне"
            button(type="button").add__group Добавить группу

        .about-groups
          .container.about-groups__container
            form.about-groups__form
              input(type="text")
              input(type="submit" value="Добавить")

            ul.skills__list
              li.skills__list-item

      .block-works
        .container.block-works__container
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

      .block-reviews
        .container.block-reviews__container
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

      .container.card
        .card__title
          .card__title-text Текст
          img(src="")
        .card__content
          .reviews__form   
            .reviews__form-content
              .reviews__form-userpic
                label.reviews__form-avatar-upload
                  input(type="file").reviews__form-file-input
                  .reviews__form-pic
                    .reviews__form-avatar-empty
                    .reviews__form-avatar-empty
                  .reviews__form-addphoto Добавить фото
              .reviews__form-col

                .reviews__form-row
                  .reviews__form-block
                    app-input(
                      title="Имя автора"
                    )
                  .reviews__form-block
                    app-input(
                      title="Титул автора"
                    )
                .reviews__form-row
                  .reviews__form-block
                    app-input(
                      title="Отзыв"
                      field-type="textarea"
                    )

          .edit-form__buttons
            .edit-form__buttons-item
              app-button(
                text="Отмена"
                class="plain"
              )
            .edit-form__buttons-item
              app-button(
                text="Загрузить"
              )

    form.form(@submit.prevent="submit")
      input(type="text" placeholder="Login" v-model="user.login")
      .error-box {{ validation.firstError('user.login') }}
      input(type="password" placeholder="password" v-model="user.password")
      .error-box {{ validation.firstError('user.password') }}
      button(type="submit") logIn

</template>

<style lang="postcss" scoped>
@import "../styles/mixins.pcss";

.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 95%;

  @include phones {
    width: 85%;
  }
}

.header__top {
  background-color: #414c63;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.header__top-left {
  display: flex;
  align-items: center;
  width: 30%;
}

.user__avatar {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.user__name {
  font-size: 18px;
  color: #fff;
}

.header__top-right {
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
}

.adm__panel-title {
  font-size: 14px;
  color: #fff;
}

.logout {
  font-size: 16px;
  color: #fff;
}

.tab__list {
  display: flex;
  height: 77px;
  background: #fff;
}

.tab__item {
  display: flex;
  position: relative;
}

.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.head__part {
  display: flex;
  align-items: center;
}

.block-about__title {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  .block-about__title-main {
    margin-bottom: 0;
    margin-right: 60px;
  }
}
.add__group {
  color: $links-color;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
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
.skills__list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
}
.skills__list-item {
  width: calc(100% / 2 - 30px);
  margin-left: 30px;
  margin-bottom: 30px;
  &.loading {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(100%);
  }
}

</style>

<script>
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;
export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    "user.login": function(value) {
      return Validator.custom(function() {
        if (value.length < 3) {
          return "Не менее 3 символов";
        }
      });
    },
    "user.password": function(value) {
      return Validator.custom(function() {
        if (value.length < 2) {
          return "Не менее 2 символов";
        }
      });
    }
  },
  data() {
    return {
      user: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$validate()
        .then(function(success) {
          if (success) {
            alert("Успешно!");
          } else {
            alert("Ошибка!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


