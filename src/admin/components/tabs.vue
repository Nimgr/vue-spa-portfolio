<template lang="pug">
  .tabs-container
    .container
      ul.tabs
        router-link(to="/"  data-text="Обо мне").tabs__link
        router-link(to="/works" data-text="Работы").tabs__link
        router-link(to="/reviews" data-text="Отзывы").tabs__link

</template>

<script>
export default {
  data() {
      return {
        // tabs: [
        //   { title: "Обо мне", link: "/" },
        //   { title: "Работы", link: "/works" },
        //   { title: "Отзывы", link: "/reviews" }
        // ]
      };
    }
};
</script>


<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";
.tabs-container {
  background: #fff;
}
.tabs {
  display: flex;
  height: 77px;
  @include phones {
    height: 87px;
  }
}
.tabs__item {
  height: 100%;
  margin-right: 30px;
  @include phones {
    margin-right: 3px;
  }
  &:last-child {
    margin-right: 0;
  }
}
.tabs__link {
  vertical-align: middle;
  white-space: nowrap;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  width: 125px;
  justify-content: center;
  border-bottom: 3px solid transparent;
  text-decoration: none;
  @include phones {
    width: 100px;
  }
  &:before {
    content: attr(data-text);
  }
  &:hover,
  &.active {
    color: #383bcf;
    font-weight: 600;
    border-color: currentColor;
  }
}
</style>