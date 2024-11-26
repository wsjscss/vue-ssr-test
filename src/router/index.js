import Home from "../pages/Home.vue";
// import About from "../pages/About.vue";

export const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => {
      console.log("yyy", Home);

      return import("../pages/Home.vue");
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/About.vue"),
    // component: About,
  },
];
