<template lang="pug">
  .card
    .card__title
      .review__user
        .review__avatar
          img(:src="`https://webdev-api.loftschool.com/${review.photo}`").review__avatar-image
        .review__info
          .review__name {{review.author}}
          .review__position {{review.occ}}
    .card__content
      .review__description {{review.text}}
      .review__btns
        button(
          type="button"
          @click="updateWork"
        ).btn.is-icon.is-pencil Править
        button(
          type="button"
          @click="removeExistedReview"
        ).btn.is-icon.is-cross Удалить    
</template>

<script>
  import { getAbsoluteImgPath } from "../helpers/pictures";
  import { mapActions, mapMutations } from "vuex";

export default {
    components: {},
    props: {
      review: Object
    },
    methods: {
      ...mapActions("reviews", ["removeReview"]),
      ...mapActions("tooltips", ["showTooltip"]),
      ...mapMutations("reviews", ["SET_CURRENT_REVIEW"]),
      updateWork() {
        this.SET_CURRENT_REVIEW(this.review.id);
        this.$emit("updateWork");
      },
      async removeExistedReview() {
        //if (confirm('Удалить отзыв?') === true)
          try {
            const response = await this.removeReview(this.review.id);

            this.showTooltip({
              type: "success",
              text: "Работа удалена"
            });
          } catch (error) {
            this.showTooltip({
              type: "error",
              text: error.message
            });
          }
      },
      constructUserObj(data) {
        return {
          name: data.author,
          occ: data.occ,
          avatar: getAbsoluteImgPath(data.photo)
        };
      }
    }
  };
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");
  @import url("../styles/card.pcss");

  .review {
    &__user {
      display: flex;
    }

    &__avatar {
      margin-right: 20px;

      &-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
    }

    &__name {
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 6px;
      font-weight: bold;
      color: $text-color;
    }

    &__position {
      font-size: 16px;
      font-weight: 600;
      color: rgba(65, 76, 99, 0.5);
    }

    &__description {
      min-height: 130px;
      font-size: 16px;
      line-height: 30px;
      font-weight: 600;
      color: rgba(65, 76, 99, 0.7);
    }

    &__btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 0;
    color: rgba(65, 76, 99, 0.5);

    &:after {
      content: "";
      width: 13px;
      height: 18px;
      display: block;
      margin-left: 8px;
    }

    &.is-pencil {
      &:after {
        background: svg-load("pencil.svg", fill=#blue) center center no-repeat / contain;
      }
    }

    &.is-cross {
      &:after {
        background: svg-load("cross.svg", fill=#red) center center no-repeat / contain;
      }
    }
  }
</style>