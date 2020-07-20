<template lang="pug">
  .about-card
    groupTitle(:category="category")
    .about-card__content
      .about-skills
        skillsItem(
          v-for="skill in skills"
          :key="skill.id"
          :skill="skill"
        )
      skillAdd(:category="category")
    
</template>

<script>
export default {
    components: {
      groupTitle: () => import("./about-group-title"),
      skillAdd: () => import("./about-skill-add"),
      skillsItem: () => import("./about-skills-item"),
    },
    props: {
      category: Object,
      skills: Array
    }
  }
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

  .about-card {
    padding: 30px;
    box-shadow: 4px 3px 20px 0 rgba(0, 0, 0, 0.07);
    background-color: #ffffff;

    &__content {
      display: flex;
      flex-flow: column nowrap;
      min-height: 300px;
      justify-content: space-between;
    }
  }

  .about {
    &-skills {
      padding: 30px 0;
      margin-bottom: 30px;
    }
  }

  .skill-add {
    &__form {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      /*min-height: 200px;*/
      padding-left: 18%;
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
  }
</style>