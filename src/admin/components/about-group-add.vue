<template lang="pug">
  .about-card
    groupTitleAdd
    .about-card__content
      skillAdd(:category="category")
    
</template>

<script>
export default {
    components: {
      skillAdd: () => import("./about-skill-add"),
      groupTitleAdd: () => import("./about-group-title-add"),
    },
    props: {
      category: Object
    }    
}
</script>

<style lang="postcss" scoped>
  @import url("../../styles/mixins.pcss");

  .about-card {
    position: relative;
    height: 100%;
    padding: 30px;
    box-shadow: 4px 3px 20px 0 rgba(0, 0, 0, 0.07);
    background-color: #ffffff;
  }
  .skill-add {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
</style>