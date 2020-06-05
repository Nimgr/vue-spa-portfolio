<template lang="pug">
  .skill-add
    form(
      @submit.prevent="submit()"
      :class="{blocked: formIsBlocked}"
    ).skill-add__form
      .skill-add__inputs
        .skill-add__input--name
          input(
            v-model="skill.title"
            v-bind:class="{ 'input__elem--error': validation.hasError('formData.skill') }"
            :disabled="formIsBlocked"
          ).input__elem(placeholder="Новый навык")
        .skill-add__input--percent
          input(
            v-model="skill.percent"
            v-bind:class="{ 'input__elem--error': validation.hasError('formData.value') }"
            :disabled="formIsBlocked"
          ).input__elem(placeholder="100")
      button(
        type="button"
        @submit.prevent="submit()"
        @click="addNewSkill"
      ).skill-add__button(data-text="+")
    
</template>

<script>
  import {Validator} from 'simple-vue-validator';
  import { mapActions } from 'vuex';

export default {
    data() {
      return {
        skill: {
          title: '',
          percent: '',
          category: this.category.id
        },
        formIsBlocked: false
      }
    },
    watch: {
      category(val) {
        this.skill.category = val.id;
      }
    },
    components: {
      buttonDefault: () => import("./button-default"),
      buttonLink: () => import("./button-link"),
    },
    validators: {
      'skill.title': function(value) {
        return Validator.value(value).required();
      },
      'skill.percent': function(value) {
        return Validator.value(value).required();
      }
    },
    methods: {
      submit: function () {
        this.$validate()
          .then(function (success) {
            if (success) {
              alert('Validation succeeded!');
            }
          });
      },
      ...mapActions('skills', ['addSkill']),
      async addNewSkill() {
        this.formIsBlocked = true;
        try {
          await this.addSkill(this.skill);
          this.skill.title = "";
          this.skill.percent = "";
        } catch(error) {
          alert(error.message);
        } finally {
          this.formIsBlocked = false;
        }
      }
    },
    props: {
      category: Object
    }
  }
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

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

</style>