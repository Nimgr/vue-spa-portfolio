<template lang="pug">
  button.button--default Загрузить
    
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
      &--default {
        display: inline-block;
        padding: 19px 40px;
        border-radius: 100px;
        font-weight: 700;
        background: linear-gradient(90deg,#006aed,#3f35cb) 50%;
        text-transform: uppercase;
        color: #fff;
      }
    }
  }
</style>