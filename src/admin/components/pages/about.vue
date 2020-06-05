<template lang="pug">
  .about-page
    .container
      .about-page__title
        h1.section-title Блок «Обо мне»
        button(@click="addGroup").about-page__add-new Добавить группу
        //button(@click="login()") Login
        //button(@click="createCat()") Create Cat

    .about-page__content
      .container.container--mobile-wide
        .about-list
          .about-list__item(v-if="condition")
            groupNew(:category="category")
          .about-list__item(v-for="category in categories")
            group(
              :category="category"
              :skills="filterSkillsByCategoryId(category.id)"
            )

</template>

<script>
  import axios from "../../requests";
  import { mapActions, mapState } from "vuex";

  export default {
    data() {
      return {
        condition: false
      }
    },
    async created() {
      try {
        await this.fetchCategories();
      } catch(error) {

      }

      try {
        this.fetchSkills();
      } catch(error) {

      }
    },
    components: {
      groupNew: () => import("../about-group-add.vue"),
      group: () => import("../about-group.vue"),
    },
    methods: {
      addGroup(){
        this.condition = !this.condition;
      },
      async login() {
        // send
        const { data: { token } } = await axios.post("/login", {name: 'nemgirov-270420', password: 'i575'});
        localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      },
      createCat() {
        axios.post("/categories", {title: 'test1'});
      },
      ...mapActions('categories', ['fetchCategories']),
      ...mapActions('skills', ['fetchSkills']),
      filterSkillsByCategoryId(categoryId) {
        return this.skills.filter(skill => skill.category === categoryId);
      }
    },
    computed: {
      ...mapState('categories', {
        categories: state => state.categories
      }),
      ...mapState('skills', {
        skills: state => state.skills
      }),
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .about-page__title {
    display: flex;
    align-items: center;
    margin-bottom: 60px;

      .section-title {
      margin-bottom: 0;
      margin-right: 60px;
        @include phones {
          margin-bottom: 28px;
        }
      }

    @include phones {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .about-page__add-new {
    color: $links-color;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0;

    &:before {
      content: "+";
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-image: linear-gradient(to right, #006aed, #3f35cb);
      line-height: 20px;
      color: #fff;
      margin-right: 13px;
      flex-shrink: 0;
      flex-basis: 20px;
    }
  }

  .about-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;


    @include phones {
      margin-left: 0;
    }

    &__item {
      width: calc(100% / 2 - 30px);
      margin-left: 30px;
      margin-bottom: 30px;
    }
  }
</style>

