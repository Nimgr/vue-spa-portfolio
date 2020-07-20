<template lang="pug">
  form(@submit.prevent="submitForm()").about-card__title
    .about-card__title-input
      input(v-model="formData.title").about-card__title-input--edit(placeholder="Название новой группы")
      .about-card__title-input-error(v-if="validation.hasError('formData.title')") Обнаружена ошибка
    .about-card__title-btns
      .about-card__title-btn
        button(@click="removeCategory(category.id)").btn.is-icon.is-tick
      .about-card__title-btn
        button(type="button").btn.is-icon.is-cross
    
</template>

<script>
import {Validator} from 'simple-vue-validator'
import $axios from "../requests";
import { mapActions, mapState } from "vuex";

export default {
    data() {
      return {
        formData: {
          title: ''
        },
        condition: false
      }
    },
    components: {
      skillAdd: () => import("./about-skill-add"),
    },
    validators: {
      'formData.title': function(value) {
        return Validator.value(value).required();
      }
    },
    methods: {
      async submitForm() {
        //this.$validate()
        const success = await this.$validate();
          if (success) {
            console.log('success');
            await this.createCategory(this.formData);
            this.formData.title = '';
            this.validation.reset();
          }
      },
      removeCategory(categoryId) {
        try {
          this.deleteCategory(categoryId)
        } catch (error) {
          alert(error.message)
        }
      },
      ...mapActions('categories', ['createCategory', 'deleteCategory']),
      toggleNewGroup(){
        this.condition = !this.condition;
      }
    },
  }
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

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
        background: svg-load("tick.svg", fill=#green) center center no-repeat / contain;
      }
    }

    &.is-tick {
      &:after {
        background: svg-load("tick.svg", fill=#green) center center no-repeat / contain;
      }
    }

    &.is-cross {
      &:after {
        background: svg-load("cross.svg", fill=#red) center center no-repeat / contain;
      }
    }
  }
</style>