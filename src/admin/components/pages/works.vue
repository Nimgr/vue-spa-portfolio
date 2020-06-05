<template lang="pug">
  .works
    .container
      .works-page__title
        h1.section-title Блок «Работы»
    addWorks(
      v-if="showForm"
      :mode="mode"
      @cancel="showForm = false"
    )

    .works__content
      .container.container--mobile-wide
        .works__items
          .card.card--plain
            addNew(
              @click.native="openAddingForm"
            )
          worksItem(
            v-for="work in works"
            :work="work"
            @updateWork="updateWork"
          )
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    props: {
      pageTitle: {
        type: String,
        default: ""
      }
    },
    components: {
      addWorks: () => import("../works-add.vue"),
      addNew: () => import("../add-new.vue"),
      worksItem: () => import("../works-item.vue"),
    },
    data() {
      return {
        showForm: false,
        mode: "add"
      };
    },
    computed: {
      ...mapState("works", {
        works: state => state.works
      })
    },
    methods: {
      ...mapActions("works", ["fetchWorks"]),
      ...mapActions("tooltips", ["showTooltip"]),
      openAddingForm() {
        this.showForm = true;
        this.mode = "add";
      },
      async collectWorks() {
        try {
          await this.fetchWorks();
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: "Ошибка при загрузке работ"
          });
        }
      },
      updateWork() {
        this.mode = "edit";
        this.showForm = true;
      }
    },
    created() {
      this.collectWorks();
    }
  }
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
@import "../../styles/card.pcss";

  .works {
    margin-bottom: 50px;

    &-page__title {
      display: flex;
      align-items: center;
      margin-bottom: 60px;

      @include phones {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__items {
      display: flex;
      flex-flow: row wrap;
      justify-content: baseline;
    }

  }
</style>
