import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import axios from '../requests';

Vue.use(VueRouter);

const router = new VueRouter({ routes });

// router.beforeEach((to, from, next) => {
//   if (to.meta.login) {
//     next ();
//   } else {
//     axios.get('user').then(({data}) => {
//         console.log(data)
//         //save user to store
//         next();
//     }).catch(error => {
//         console.log(error);
//         localStorage.removeItem('token')
//         router.replace('/login')
//     })
//     }
// });

export default router;