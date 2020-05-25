// const Works = { template: '<div>Works</div>'}
// const Reviews = { template: '<div>Reviews</div>'}
// const login = { template: '<div>Login</div>'}

export default [
  // { path: '/', component: () => import('../pages/about.vue') },
  // { path: '/works', component: Works},
  // { path: '/reviews', component: Reviews},
  // { path: '/login', component: login, meta: { login: true}}
    {
      path: "/",
      component: () => import("../pages/about.vue"),
      meta: {
        title: "Блок «Обо мне»"
      }
    },
    {
      path: "/works",
      component: () => import("../pages/works.vue"),
      meta: {
        title: "Блок «Работы»"
      }
    },
    {
      path: "/reviews",
      component: () => import("../pages/reviews.vue"),
      meta: {
        title: "Блок «Отзывы»"
      }
    },
    {
      path: "/login",
      component: () => import("../pages/login.vue"),
      meta: {
        login: true
      }
    }
  ];