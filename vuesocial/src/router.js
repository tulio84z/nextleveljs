import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'

import User from '@/components/users/DetailUser.vue'
import CreateUser from '@/components/users/CreateUser.vue'
import ListUsers from '@/components/users/ListUsers.vue'
import UpdateUser from '@/components/users/UpdateUser.vue'
import LoginUser from '@/components/users/LoginUser.vue'

import Post from '@/components/posts/DetailPost.vue'
import CreatePost from '@/components/posts/CreatePost.vue'
import ListPosts from '@/components/posts/ListPosts.vue'
import UpdatePost from '@/components/posts/UpdatePost.vue'

import Group from '@/components/groups/DetailGroup.vue'
import CreateGroup from '@/components/groups/CreateGroup.vue'
import ListGroups from '@/components/groups/ListGroups.vue'
import UpdateGroup from '@/components/groups/UpdateGroup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    //User routes
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/create-user",
      name: "createUser",
      component: CreateUser
    },
    {
      path: "/users",
      name: "listUsers",
      component: ListUsers
    },
    {
      path: "/update-user",
      name: "updateUser",
      component: UpdateUser
    },
    {
      path: "/login-user",
      name: "loginUser",
      component: LoginUser
    },
    //Post routes
    {
      path: "/post/id/:id",
      name: "post",
      props: true,
      component: Post
    },
    {
      path: "/post/new",
      name: "createPost",
      component: CreatePost
    },
    {
      path: "/posts",
      name: "listPosts",
      component: ListPosts
    },
    {
      path: "/update-post",
      name: "updatePost",
      component: UpdatePost
    },
    //Group routes
    {
      path: "/group/id/:id",
      name: "group",
      props: true,
      component: Group
    },
    {
      path: "/group/new",
      name: "createGroup",
      component: CreateGroup
    },
    {
      path: "/groups",
      name: "listGroups",
      component: ListGroups
    },
    {
      path: "/update-group",
      name: "updateGroup",
      component: UpdateGroup
    },
  ]
})
