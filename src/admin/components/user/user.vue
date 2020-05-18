<template lang="pug">
  .user-component
    .avatar
      img(:src="userpic")
    .username {{username}}
</template>

<script>
export default {
  props: ["username", "userpic"] 
}
</script>

<style lang="postcss" scoped>
  .user-component {
    display: flex;
    align-items: center;
  }
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .name {
    font-size: 18px;
    color: #fff;
  }
</style>