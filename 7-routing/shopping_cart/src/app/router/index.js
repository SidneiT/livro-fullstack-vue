import Vue from "vue";
import VueRouter from "vue-router";
import CartList from "../components/cart/CartList";
import ProductList from "../components/product/ProductList";
import ProductItem from "../components/product/ProductItem";
import NotFound from "../components/NotFound";
import Login from "../components/login/LoginBox";
import store from "vuex";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/products",
      component: ProductList
    },
    {
      name: "products",
      path: "/products/:id",
      component: ProductItem,
      props: true,
      beforeEnter(to, from, next) {
        const id = to.params.id;
        if (![1, 2, 3, 4].includes(Number(id))) next("not-found");
        next();
      }
    },
    {
      path: "/cart",
      component: CartList
    },
    {
      path: "/",
      redirect: "/products"
    },
    {
      path: "/login",
      component: Login,
      beforeEnter(to, from, next) {
        const token = localStorage.getItem("token");
        if (token) return next("/products");
        return next();
      }
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.path !== "/login") return next("/login");
  return next();
});

export default router;
