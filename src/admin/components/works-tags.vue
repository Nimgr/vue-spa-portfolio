<template lang="pug">
  .works-add__tags
    .works-add__tag(v-for="(tag, index) in tagsArray" :key="tag") {{tag}}
      button.btn.is-icon.is-cross(
        type="button"
        @click="removeTag(index)"
      )    
</template>

<script>
export default {
    components: {},
    props: {
      value: String,
      errorText: String,
      tagsString: {
        type: String,
        default: ''
      },
    },
    data() {
      return {};
    },
    computed: {
      tagsArray() {
        if (!this.tagsString.length) return [];
        return this.tagsString.split(",");
      },
    },
    methods: {
      handleInput($event) {
        this.$emit("input", $event);
        this.tags = $event;
      },
      removeTag(index) {
        const tagsArray = [...this.tagsArray];
        tagsArray.splice(index, 1);

        this.$emit("removeTag", tagsArray.join(","));
      }
    }
  };
</script>

<style lang="postcss" scoped>
  .add-tags__wrapper {
    margin-bottom: 20px;
  }

  .works {
    &-add {
      &__tags {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 10px;
        bottom: 10px;
      }
      &__tag {
        margin-left: 8px;
        font-size: 13px;
        line-height: 1;
        padding: 10px 18px;
        border-radius: 15px;
        color: rgba(40, 51, 64, 1);
        background-color: #ffffff;
      }
    }
  }

  .works__items .works-add__tag .btn {
    display: none;
  }

  .works-add__field  {
    .works {
      &-add {
        &__tags {
          top: 100%;
          right: unset;
          bottom: unset;
          left: 0;
        }
      }
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