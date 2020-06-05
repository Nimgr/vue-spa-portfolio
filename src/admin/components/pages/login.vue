<template lang="pug">
  .login-section
    .login__content
      form(@submit.prevent="login").login-form
        .login-form__title Авторизация
        .login__row
          app-input(
            title="Логин"
            icon="user"
            v-model="user.name"
          )
            //- .input__title 
            //- input(v-model="user.name" placeholder="login" type="text").input__elem.field__elem
        .login__row
          app-input(
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
          )
            //- .input__title 
            //- input(v-model="user.password" placeholder="password" type="password").input__elem.field__elem
        .login__btn
          button(
            type="submit"
          ).login__send-data Отправить


</template>

<script>
  import axios from "../../requests";
  import SimpleVueValidator from "simple-vue-validator";
  const Validator = SimpleVueValidator.Validator;
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
  components: {
    appInput: () => import("../input.vue")
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
        } = await axios.post("/login", this.user);

        localStorage.setItem("token", token);
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
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
@import "../../../styles/mixins.pcss";
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../../images/content/admin.jpg") center center / cover no-repeat;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background: $text-color;
  }
}
.login-form__title {
  font-size: 36px;
  text-align: center;
  font-weight: 600;
}
.login__content {
  position: relative;
  @include phones {
    height: 100%;
    width: 100%;
  }
}
.login__row {
  margin-bottom: 35px;
}
.login__btn {
  display: flex;
  width: 100%;
  padding: 0 8%;
  justify-content: center;
}
.login__send-data {
  width: 100%;
  padding: 30px;
  background-image: linear-gradient(to right, #ad00ed, #5500f2);
  border-radius: 40px 0 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}
.login-form {
  width: 563px;
  padding: 50px 77px 60px;
  background: #fff;
  @include phones {
    width: 100%;
    padding-right: 7%;
    padding-left: 7%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.input__error-tooltip {
  display: none;
  position: absolute;
  top: 100%;
  left: 30%;
  transform: translateX(-50%);
  z-index: 100;
}
.input {
  display: block;
  position: relative;
  &.no-side-paddings {
    .input__elem {
      padding-right: 0;
      padding-left: 0;
    }
  }
  &_labeled {
    .input__elem {
      padding: 15px 0 18px;
    }
  }
  &_iconed {
    .input__title {
      margin-left: 45px;
      margin-bottom: 13px;
    }
    .input__elem {
      padding-left: 45px;
      background: left center / auto 29px no-repeat;
      font-size: 18px;
      font-weight: bold;
      padding-top: 17px;
      padding-bottom: 17px;
    }
  }
  &_icon {
    @each $icon in (user, key) {
      &-$(icon) {
        .input__elem {
          background-image: svg-load("$(icon).svg", fill=#cfd2d7);
        }
      }
    }
  }
  &.error {
    @each $icon in (user, key) {
      &.input_icon-$(icon) {
        .input__elem {
          background-image: svg-load("$(icon).svg", fill=$errors-color);
        }
      }
    }
  }
}
.error {
  .field__elem {
    border-color: $errors-color;
  }
  .input__error-tooltip {
    display: block;
  }
}
.textarea {
  position: relative;
}
.input__title {
  color: rgba(65, 76, 99, 0.5);
  font-weight: 600;
  opacity: 0.5;
}
.textarea__elem {
  height: 150px;
  padding: 20px;
  border: 1px solid rgba($text-color, 0.2);
  resize: none;
  font-weight: 600;
  margin-top: 10px;
  width: 100%;
}
.input__elem {
  width: 100%;
  padding: 10px 8%;
  border: none;
  border-bottom: 1px solid #1f232d;
  &::placeholder {
    color: rgba(55, 62, 66, 0.25);
  }
}
</style>
