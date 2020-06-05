<template lang="pug">
  .about-skill(v-if="editModeOn === false")
    .about-skill__title {{skill.title}}
    .about-skill__value {{skill.percent}}
    .about-skill__btns
      .about-skill__btn
        button(
          type="button"
          @click="editModeOn = true"
        ).btn.is-icon.is-pencil
      .about-skill__btn
        button(
          type="button"
          @click="removeExistedSkill"
        ).btn.is-icon.is-trash

  .about-skill(v-else)
    input(
      type="text"
      v-model="editedSkill.title"
      placeholder="Название"
    ).about-skill__title.about-skill__title--input
    input(
      type="text"
      v-model="editedSkill.percent"
      placeholder="Проценты"
    ).about-skill__value.about-skill__value--input
    .about-skill__btns
      .about-skill__btn
        button(
          type="button"
          @click="editCurrentSkill"
        ).btn.is-icon.is-tick
      .about-skill__btn
        button(
          type="button"
        @click="editModeOn = false"
        ).btn.is-icon.is-cross    
</template>

<script>
  import { mapActions } from 'vuex';

export default {
    props: {
      skill: Object
    },
    data() {
      return {
        editModeOn: false,
        editedSkill: {...this.skill}
      }
    },
    methods: {
      ...mapActions('skills', ["removeSkill", "editSkill"]),
      async removeExistedSkill() {
        try {
          await this.removeSkill(this.skill.id);
        } catch(error) {

        }
      },
      async editCurrentSkill() {
        try {
          await this.editSkill(this.editedSkill);
          this.editModeOn = false;
        } catch(error) {

        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

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
        background: svg-load("tick.svg", fill=$text-color) center center no-repeat / contain;
        opacity: .6;
      }
    }

    &.is-pencil {
      &:after {
        background: svg-load("pencil.svg", fill=$text-color) center center no-repeat / contain;
      }
    }

    &.is-trash {
      &:after {
        background: svg-load("trash.svg", fill=$text-color) center center no-repeat / contain;
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