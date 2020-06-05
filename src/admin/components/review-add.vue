<template lang="pug">
  .review-add
    .review-add__title {{formTitle}}
    form.review-add__form(
      @cancel="closeForm"
      @submit.prevent="mode === 'add' ? addNewReview() : editCurrentReview()"
    )
      label.review-add__avatar(
        :class="{ 'error' :  validation.hasError('review.photo') }"
      )
        .review-add__avatar-upload(
          :class="{'filled' : renderedAvatar.length}"
          :style="{'backgroundImage' : userAvatarUrl}"
        )
        .review-add__avatar-link Добавить фото
        input.review-add__avatar--input(
          type="file"
          @change="handlePhotoUpload"
        )
      .review-add__content
        .review-add__row
          .review-add__field
            label.review-add__label(for="author") Имя автора
            input.review-add__input#author(
              v-model="review.author"
              :errorText="validation.firstError('review.author')"
            )
          .review-add__field
            label.review-add__label(for="occ") Титул автора
            input.review-add__input#occ(
              v-model="review.occ"
              :errorText="validation.firstError('review.occ')"
            )
        .review-add__row
          .review-add__field.review-add__field--textarea
            label.review-add__label(for="text") Отзыв
            textarea.review-add__input#text(
              v-model="review.text"
              :errorText="validation.firstError('review.text')"
            )
        .review-add__btns
          buttonLink(
            type="button"
            @click.native="$emit('cancel')"
          )
          buttonDefault

</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { renderer, getAbsoluteImgPath } from "../helpers/pictures";
  import { Validator } from "simple-vue-validator";

export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "review.author": value => {
        return Validator.value(value).required("Заполните автора");
      },
      "review.occ": value => {
        return Validator.value(value).required("Укажите роль автора");
      },
      "review.text": value => {
        return Validator.value(value).required("Введите текст отзыва");
      },
      "review.photo": value => {
        return Validator.value(value).required("Вставьте аватар");
      }
    },
    data() {
      return {
        renderedAvatar: "",
        disableForm: false,
        review: {
          id: 0,
          author: "",
          occ: "",
          text: "",
          photo: ""
        }
      };
    },
    props: {
      title: {
        type: String,
        default: "Новый отзыв"
      },
      mode: {
        type: String,
        default: "add",
        validator: value => ["add", "edit"].includes(value)
      }
    },
    components: {
      buttonDefault: () => import("./button-default"),
      buttonLink: () => import("./button-link"),
    },
    computed: {
      ...mapState("reviews", {
        currentReview: state => state.currentReview
      }),
      userAvatarUrl() {
        return `url(${this.renderedAvatar})`;
      },
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
    watch: {
      currentReview(value) {
        if (this.mode === "edit") this.fillFormWithCurrentReviewData();
      }
    },
    created() {
      if (this.mode === "edit") this.fillFormWithCurrentReviewData();
    },
    methods: {
      ...mapActions("reviews", ["addReview", "updateReview"]),
      ...mapActions("tooltips", ["showTooltip"]),
      closeForm() {
        this.review = {};
        this.$emit("cancel");
      },
      async editCurrentReview() {
        if (this.$validate() === false) return;
        this.disableForm = true;
        try {
          const response = await this.updateReview(this.review);

          this.$emit("cancel");
          this.showTooltip({
            type: "success",
            text: "Работа обновлена"
          });
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: error.message
          });
        } finally {
          this.disableForm = false;
          this.validation.reset();
        }
      },
      async addNewReview() {
        if ((await this.$validate()) === false) return;
        this.disableForm = true;
        try {
          const response = await this.addReview(this.review);
          this.clearFormFields();

          this.showTooltip({
            type: "success",
            text: "Отзыв добавлен"
          });
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: error.message
          });
        } finally {
          this.disableForm = false;
          this.valdation.reset();
        }
      },
      clearFormFields() {
        this.review = {};
        this.renderedAvatar = "";
      },
      fillFormWithCurrentReviewData() {
        this.review = { ...this.currentReview };
        this.renderedAvatar = getAbsoluteImgPath(this.currentReview.photo);
      },
      async handlePhotoUpload(e) {
        const file = e.target.files[0];
        this.review.photo = file;

        try {
          const renderedResult = await renderer(file);
          this.renderedAvatar = renderedResult;
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: "Ошибка во время обработки файла"
          });
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");

  .review-add {
    box-shadow: 4px 3px 20px 0 rgba(0, 0, 0, 0.07);
    background-color: #fff;
    padding: 20px;
    margin-bottom: 30px;

    &__title {
      font-size: 18px;
      line-height: 2;
      font-weight: 700;
      color: $text-color;
      border-bottom: 1px solid rgba(31, 35, 45, .15);
      padding: 0 0 20px;
    }

    &__form {
      display: flex;
      flex-flow: row nowrap;
      padding: 50px 0;

      
    }

    &__avatar {
      width: 200px;
      margin-right: 30px;
      cursor: pointer;

      

      &:hover {
        .review-add__avatar-link {
          color: #green;
        }
      }

      &-upload {
        width: 200px;
        height: 200px;
        margin-bottom: 25px;
        border-radius: 50%;
        background: #dee4ed;
        position: relative;

        

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 84px;
          height: 112px;
          transform: translate(-50%,-50%);
          background: svg-load("user.svg", fill=#fff) 50% no-repeat;
        }

        &.filled {
          &:after {
            display: none;
          }
        }
      }

      &-link {
        text-align: center;
        font-weight: 600;
        color: #blue;
      }

      &--input {
        display: none;
      }
    }

    &__content {
      width: calc(80% - 230px);

      
    }

    &__row {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 40px;
    }

    &__field {
      flex: 1;
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }

      &--textarea {
        .review-add__label {
          display: block;
          margin-bottom: 10px;
        }

        .review-add__input {
          height: 150px;
          padding: 20px;
          border: 1px solid rgba(65,76,99,.2);
          resize: none;
        }
      }
    }

    &__label {
      color: rgba(65,76,99,.5);
      font-weight: 600;
      opacity: .5;
    }

    &__input {
      display: block;
      width: 100%;
      padding: 15px 0 18px;
      border: none;
      border-bottom: 1px solid #1f232d;
      font-weight: 600;
    }

    &__btns {
      text-align: right;
    }
  }
</style>