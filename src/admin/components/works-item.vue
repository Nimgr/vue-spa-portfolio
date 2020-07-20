<template lang="pug">
  .card
    .card__title.card__title--wide
      .works__image
        img(:src="`https://webdev-api.loftschool.com/${work.photo}`")
        worksTags(
          :tags-string="this.work.techs"
        )
    .card__content
      .works__name {{work.title}}
      .works__description {{work.description}}
      .works__link {{work.link}}
      .works__btns
        button(
          type="button"
          @click="updateWork"
        ).btn.is-icon.is-pencil Править
        button(
          type="button"
          @click="removeExistedWork"
        ).btn.is-icon.is-cross Удалить    
</template>

<script>
import requests from "../requests";
import { mapActions, mapMutations } from "vuex";
import { getAbsoluteImgPath } from "../helpers/pictures";

export default {
    components: {
      worksTags: () => import("./works-tags.vue"),
    },
    props: {
      work: Object
    },
    computed: {
      imagePath() {
        return getAbsoluteImgPath(this.work.photo);
      },
      tagsArray() {
        return this.work.techs.split(",");
      }
    },
    methods: {
      ...mapActions("works", ["removeWork"]),
      ...mapActions("tooltips", ["showTooltip"]),
      ...mapMutations("works", ["SET_CURRENT_WORK"]),
      updateWork() {
        this.SET_CURRENT_WORK(this.work.id);
        this.$emit("updateWork");
      },
      async removeExistedWork() {
        //if (confirm("Удалить работу?") === false) return;
        try {
          const response = await this.removeWork(this.work.id);

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
      }
    }    
};
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");
  @import url("../styles/card.pcss");

  .works {

    &__image {
      position: relative;
      width: 100%;

      img {
        width: 100%;
        height: 190px;
      }
    }

    &-add {
      &__tags {
        position: absolute;
      }
    }

    &__name {
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 12px;
      font-weight: bold;
      color: $text-color;
    }

    &__description {
      font-size: 16px;
      line-height: 30px;
      font-weight: 600;
      color: rgba(65, 76, 99, 0.7);
      margin-bottom: 20px;
    }

    &__link {
      color: #383bcf;
      font-weight: 600;
      margin-bottom: 35px;
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