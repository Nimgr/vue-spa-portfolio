<template lang="pug">
  input.input__elem
    
</template>

<script>
import {Validator} from 'simple-vue-validator'

export default {
    validators: {

    }    
}
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

  .input__elem {
    width: 100%;
    padding: 0.625rem 8%;
    border: none;
    border-bottom: 1px solid #1f232d;
  }
</style>