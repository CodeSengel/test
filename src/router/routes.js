const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "me",
        name: "me",
        component: () => import("pages/Me.vue"),
      },

      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/Dashboard.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/Category/List.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("pages/Test.vue"),
      },
      {
        path: "form-dashboard/:id?",
        name: "form-dashboard",
        component: () => import("pages/Category/Form.vue"),
      },
      {
        path: "mesmagasin",
        name: "mesmagasin",
        component: () => import("pages/Souk/MesMagasin.vue"),
      },
      {
        path: "product",
        name: "product",
        component: () => import("pages/Product/List.vue"),
      },
      {
        path: "product-public/:id?",
        name: "product-public",
        component: () => import("pages/Product/Public.vue"),
      },
      {
        path: "form-product/:id?",
        name: "form-product",
        component: () => import("pages/Product/Form.vue"),
      },
      {
        path: "Magasin_form/:id?",
        name: "Magasin_form",
        component: () => import("pages/Souk/Magasin_form.vue"),
      },

      {
        path: "magasin/:id?",
        name: "magasin",
        component: () => import("pages/Souk/Magasin.vue"),
      },

      {
        path: "magasin_type",
        name: "magasin_type",
        component: () => import("pages/Souk/Magasin_type.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/",
    component: () => import("layouts/MainLayoutlogin.vue"),
    children: [
      {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },

      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "registration",
        name: "registration",
        component: () => import("pages/Registration.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "error404",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
