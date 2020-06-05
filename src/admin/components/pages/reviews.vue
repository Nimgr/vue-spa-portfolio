<template lang="pug">
  section.reviews
    .container
      .reviews__title
        h1.section-title Блок «Отзывы»
      addReview(
        v-if="showAddingForm"
        :mode="mode"
        @cancel="showAddingForm = false"
      )
      .reviews__items
        .card.card--plain(@click="addNewReview")
          addNew(
            :mode="mode"
            @cancel="showAddingForm = false"
          )
        reviewItem(
          v-for="review in reviews"
          :key="review.id"
          :review="review"
          @updateWork="updateWork"
          :title="formTitle"
        )
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    props: {
      pageTitle: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        mode: "",
        showAddingForm: false
      };
    },
    components: {
      addReview: () => import("../review-add.vue"),
      reviewItem: () => import("../review-item.vue"),
      addNew: () => import("../add-new.vue"),
    },
    computed: {
      ...mapState("reviews", {
        reviews: state => state.reviews
      }),
      formTitle() {
        switch (this.mode) {
          case "add":
            return "Добавить отзыв";
          case "edit":
            return "Изменить отзыв";
          default:
            return "Добавить отзыв";
            console.warn("не верное значение поля mode в reviews");
        }
      }
    },
    created() {
      this.collectReviews();
    },
    methods: {
      ...mapActions("reviews", ["fetchReviews"]),
      ...mapActions("tooltips", ["showTooltip"]),
      updateWork() {
        this.mode = "edit";
        this.showAddingForm = true;
      },
      addNewReview() {
        this.mode = "add";
        this.showAddingForm = true;
      },
      async collectReviews() {
        try {
          await this.fetchReviews();
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: "Не удалось загурузить отзывы"
          });
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";
  @import "../../styles/card.pcss";

  .reviews {
    margin-bottom: 50px;

    &__title {
      margin-bottom: 60px;
    }

    &__items {
      display: flex;
      flex-flow: row wrap;
      justify-content: baseline;
    }
  }
</style>
