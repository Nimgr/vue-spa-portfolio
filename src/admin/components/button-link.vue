<template lang="pug">
  button.button--link Отмена    
</template>

<script>
export default {
    components: {

    }
}
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

  button {
    &.button {
      &--link {
        display: inline-block;
        padding: 19px 40px;
        font-weight: 700;
        color: #4b6fd7;
        background: transparent;
      }
    }
  }
</style>