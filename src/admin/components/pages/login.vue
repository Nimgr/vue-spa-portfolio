<template lang="pug">
  .login
    .container.login__container
      form(@submit.prevent="login").login__form.login-form
        h1.login-form__title Авторизация
        .login-form__field.login-form__field--username
          label Логин
          input(
            type="text"
            placeholder="Введите имя"
            v-model="user.name"
          )
        .login-form__field.login-form__field--password
          label Пароль
          input(
            type="password"
            placeholder="Введите пароль"
            v-model="user.password"
          )
        button(type="submit").login-form__btn Отправить


</template>

<script>
  import $axios from "../../requests";
  import {Validator} from 'simple-vue-validator'
  import { setToken, setAuthHttpHeaderToAxios } from "../../helpers/token.js";

export default {
    data() {
      return {
        user: {
          name: "nemgirov-270420",
          password: ""
        }
      };
    },
    validators: {
      'user.name': function(value) {
        return Validator.value(value).required();
      },
      'user.password': function(value) {
        return Validator.value(value).required();
      }
    },
    methods: {
      async login() {
        try {
          const {
            data: { token }
          } = await $axios.post("/login", this.user);

          localStorage.setItem("token", token);
          $axios.defaults.headers['Authorization'] = `Bearer ${token}`;
          this.$router.replace('/');

        } catch (error) {
          console.log(error.response);
          alert('No registration')
        }
      }
    }
  };
</script>

<style lang="postcss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    
    @media (max-width: 600px) {
      width: 100%;
      height: 100%;
      background: #fff;
      margin-top: -60px;
    }

    &__container {
      display: inline-flex;
      max-width: 560px;
      padding: 60px 80px;
      background: #fff;

      @media (max-width: 600px) {
        padding: 30px;
      }
    }

    &__form {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
    }

    &-form {
      &__title {
        font-size: 36px;
        font-weight: 600;
        line-height: 1.6;
        color: $text-color;
        text-align: center;
        margin-bottom: 35px;
      }

      &__field {
        display: flex;
        flex-flow: column nowrap;
        margin-bottom: 40px;

        &--username {
          &:before {
            position: absolute;
            content: '';
            width: 26px;
            height: auto;
            background: url('../../../images/icons/avatar.svg');
          }
        }

        &--password {}

        label {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.8;
          color: rgba(65, 76, 99, 0.3);
          padding-left: 45px;
        }

        input {
          padding-left: 45px;
          font-size: 18px;
          font-weight: bold;
          line-height: 2.6;
          color: $text-color;
          border: none;
          border-bottom: 1px solid $text-color;
        }
      }

      &__btn {
        padding: 34px 120px 33px;
        font-size: 18px;
        font-weight: bold;
        line-height: 1;
        color: #fff;
        background-image: linear-gradient(to right, #ad00ed, #5500f2);
        border-radius: 50px 0 50px 0;
        text-transform: uppercase;

        @media (max-width: 600px) {
          padding: 34px 10px 33px;
          width: 100%;
        }
      }
    }
  }
</style>
