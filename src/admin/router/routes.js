// const Works = { template: '<div>Works</div>'}
// const Reviews = { template: '<div>Reviews</div>'}
// const login = { template: '<div>Login</div>'}
import about from '../components/pages/about';
import works from '../components/pages/works';
import reviews from '../components/pages/reviews';
import login from '../components/pages/login';

export default [
  // { path: '/', component: () => import('../components/pages/about.vue') },
  // { path: '/works', component: Works},
  // { path: '/reviews', component: Reviews},
  // { path: '/login', component: login, meta: { login: true}}
    {
      path: "/",
      component: () => import("../components/pages/about.vue"),
      meta: {
        title: "Блок «Обо мне»"
      }
    },
    {
      path: "/works",
      component: () => import("../components/pages/works.vue"),
      meta: {
        title: "Блок «Работы»"
      }
    },
    {
      path: "/reviews",
      component: () => import("../components/pages/reviews.vue"),
      meta: {
        title: "Блок «Отзывы»"
      }
    },
    {
      path: "/login",
      component: () => import("../components/pages/login.vue"),
      meta: {
        login: true
      }
    }
  ];