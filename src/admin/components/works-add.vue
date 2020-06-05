<template lang="pug">
  .works-add.container
    .card.card--wide
      .card__title
        .works-add__title Редактирование работы
      .card__content
        form(
          :title="editFormTitle"
          @cancel="cancelAdding"
          @submit.prevent="mode === 'add' ? addNewWork() : editWork()"
          :disabled="disableForm"
        ).works-add__content
          .works-add__upload(
            :class="{'filled' : renderedPhoto.length}"
            :style="{'backgroundImage' : workPhotoUrl}"
          )
            label.works-add__upload-text Перетащите или загрузите для загрузки изображения
              input(
                type="file"
                @change="handlePhotoUpload"
              )
            buttonDefault
          .works-add__info
            .works-add__field
              .works-add__field-error(v-if="validation.hasError('work.title')") Обнаружена ошибка
              label.works-add__label(for="title") Название
              input(v-model="work.title").works-add__input#title
            .works-add__field
              .works-add__field-error(v-if="validation.hasError('work.link')") Обнаружена ошибка
              label.works-add__label(for="link") Ссылка
              input(v-model="work.link").works-add__input#link
            .works-add__field.works-add__field--textarea
              .works-add__field-error(v-if="validation.hasError('work.description')") Обнаружена ошибка
              label.works-add__label(for="description") Описание
              textarea(v-model="work.description").works-add__input#description
            .works-add__field
              .works-add__field-error(v-if="validation.hasError('work.techs')") Обнаружена ошибка
              label.works-add__label(for="techs") Добавление тега
              input(v-model="work.techs").works-add__input#techs
              worksTags(
                :tags-string="this.work.techs"
                @removeTag="value => this.work.techs = value"
                :errorText="validation.firstError('work.techs')"
              )
            .works-add__btns
              buttonLink(
                type="button"
                @click.native="$emit('cancel')"
              )
              buttonDefault

</template>

<script>
  import { mapActions, mapState } from "vuex";
  import {Validator} from 'simple-vue-validator';
  import { renderer, getAbsoluteImgPath } from "../helpers/pictures";

export default {
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "work.title": value => {
        return Validator.value(value).required("Заполните название");
      },
      "work.techs": value => {
        return Validator.value(value).required("Заполните технологии");
      },
      "work.link": value => {
        return Validator.value(value).required("Заполните ссылку");
      },
      "work.description": value => {
        return Validator.value(value).required("Заполните описание");
      },
      "work.photo": value => {
        return Validator.value(value).required("Вставьте файл");
      }
    },
    props: {
      mode: {
        type: String,
        default: "add",
        validator: value => ["add", "edit"].includes(value)
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {
      buttonDefault: () => import("./button-default"),
      buttonLink: () => import("./button-link"),
      worksTags: () => import("./works-tags"),
    },
    data() {
      return {
        disableForm: this.disabled,
        renderedPhoto: "",
        work: {
          id: 0,
          title: "",
          techs: "",
          link: "",
          photo: "",
          description: ""
        }
      };
    },
    computed: {
      ...mapState("works", {
        currentWork: state => state.currentWork
      }),
      workPhotoUrl() {
        return `url(${this.renderedPhoto})`;
      },
      editFormTitle() {
        switch (this.mode) {
          case "edit":
            return "Редактирование работы";
          case "add":
            return "Добавление работы";
        }
      }
    },
    created() {
      if (this.mode === "edit") {
        this.fillFormWithCurrentWorkData();
      }
    },
    watch: {
      currentWork(value) {
        if (this.mode === "edit") {
          this.fillFormWithCurrentWorkData();
        }
      },
      mode(value) {
        if (value === "add") {
          this.clearFormFields();
        }
      }
    },
    methods: {
      ...mapActions("works", ["storeWork", "updateWork"]),
      ...mapActions("tooltips", ["showTooltip"]),
      async editWork() {
        if ((await this.$validate()) === false) return;

        this.disableForm = true;
        try {
          const response = await this.updateWork(this.work);
          this.$emit("closeForm");

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
      async addNewWork() {
        if ((await this.$validate()) === false) return;
        this.disableForm = true;
        try {
          const response = await this.storeWork(this.work);

          this.clearFormFields();

          this.showTooltip({
            text: "Работа создана",
            type: "success"
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
      cancelAdding() {
        this.clearFormFields();
        this.$emit("closeForm");
      },
      clearFormFields() {
        this.work = {};
        this.renderedPhoto = "";
      },
      fillFormWithCurrentWorkData() {
        this.work = { ...this.currentWork };
        this.renderedPhoto = getAbsoluteImgPath(this.currentWork.photo);
      },
      async handlePhotoUpload(e) {
        const file = e.target.files[0];
        this.work.photo = file;

        try {
          const rendererResult = await renderer(file);
          this.renderedPhoto = rendererResult;
        } catch (error) {
          this.showTooltip({
            type: "error",
            text: error.message
          });
        }
      }
    }
  }    
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");
  @import url("../styles/card.pcss");

  .works-add {
    margin-bottom: 50px;

    &__title {
      font-size: 18px;
      font-weight: bold;
      color: $text-color;
    }

    &__content {
      display: flex;
      flex-flow: row nowrap;
    }

    &__upload {
      position: relative;
      display: flex;
      flex-flow: column nowrap;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: max-content;
      padding: 80px 20px 60px;
      margin-right: 30px;
      border: 1px dashed #a1a1a1;
      background-color: #dee4ed;

      &.filled {
        label {
          opacity: 0;
        }
        &:after {
          display: none;
        }
      }

      &-text {
        max-width: 240px;
        text-align: center;
        color: rgba(65, 76, 99, 0.5);
        font-size: 16px;
        line-height: 2.1;
        font-weight: 600;
        margin-bottom: 27px;

        input {
          opacity: 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }

    &__info {
      flex: 1;
    }

    &__field {
      position: relative;
      margin-bottom: 40px;

      &--textarea {
        .works-add__label {
          display: block;
          margin-bottom: 10px;
        }

        .works-add__input {
          height: 150px;
          padding: 20px;
          border: 1px solid rgba(65,76,99,.2);
          resize: none;
        }
      }

      &-error {
        position: absolute;
        content: 'Ошибка';
        color: #fff;
        background: #red;
        font-size: 15px;
        line-height: 1;
        width: 50%;
        height: 80%;
        margin: 0 0 10px 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

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

    &__tags {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-top: 15px;
    }

    &__tag {
      display: flex;
      align-items: center;
      margin: 0 8px 8px 0;
      padding: 6px 20px 6px 20px;
      font-size: 13px;
      line-height: 19px;
      color: rgba(40,51,64,.5);
      background: #f4f4f4;
      border-radius: 15px;

      span {
        margin-right: 10px;
      }
    }

    &__btns {
      text-align: right;
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

    &.is-cross {
      &:after {
        background: svg-load("cross.svg", fill=$text-color) center center no-repeat / contain;
      }
    }
  }
</style>