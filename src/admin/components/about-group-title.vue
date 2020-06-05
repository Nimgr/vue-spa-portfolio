<template lang="pug">
  .about-card__title
    .about-card__title-input
      .about-card__title {{category.category}}
    .about-card__title-btns
      .about-card__title-btn
        button.btn.is-icon.is-tick
      .about-card__title-btn
        button(type="button" @click="removeCategory(category.id)").btn.is-icon.is-cross
    
</template>

<script>
import {Validator} from 'simple-vue-validator'
import $axios from "../requests";
import { mapActions, mapState } from "vuex";

export default {
    components: {
      skillAdd: () => import("./about-skill-add"),
    },
    props: {
      category: Object
    },
    methods: {
      filterSkills(categoryId) {
        return this.skills.filter(skill => skill.category === categoryId)
      },
      removeCategory(categoryId) {
        this.deleteCategory(categoryId)
      },
      ...mapActions('categories', ['createCategory', 'deleteCategory']),
    },
  }
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

  .about-card {
    &__title {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);

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