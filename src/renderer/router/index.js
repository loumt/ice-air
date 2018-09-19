import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Test from '@/views/Test'
import Login from '@/views/Login'
import System from '@/views/System'
//router view
import Client from '@/components/Main/Client/index'
import Apis from '@/components/Main/Apis/index'
import AppsApi from '@/components/Main/Apis/components/AppsApi.vue'
import LoginApi from '@/components/Main/Apis/components/LoginApi.vue'
import ConnectionParameters from '@/components/Main/Apis/components/ConnectionParams.vue'
import ConnectionState from '@/components/Main/Apis/components/ConnectionState.vue'
import AppParams from '@/components/Main/Client/components/AppParams.vue'
import Update from '@/components/Main/Client/components/Update.vue'
import AppParamApi from '@/components/Main/Apis/components/AppParamApi.vue'
import ExtToApp from '@/components/Main/Apis/components/ExtToApp.vue'
import FileUpload from '@/components/Main/File/components/FileUpload.vue'
import SFTP from '@/components/Main/File/components/SFTP.vue'
import ClipBoard from '@/components/Main/Client/components/ClipBoard.vue'
import RdpConnect from '@/components/Main/Client/components/RdpConnect.vue'
import LoginModelVue from '@/components/Main/Client/components/Login.vue'
import MousePosition from '@/components/Main/Client/components/MousePosition.vue'
import ReceiveMessage from '@/components/Main/Client/components/ReceiveMessage.vue'
import Store from '@/components/Main/Client/components/Store.vue'
import TestModelVue from '@/components/Main/Client/components/Test.vue'
import ToLogin from '@/components/Main/Client/components/ToLogin.vue'
import ToTest from '@/components/Main/Client/components/ToTest.vue'

import ElementUI from '@/components/Main/ElementUI/index'
import File from '@/components/Main/File/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: 'client',
      children: [
        {
          path: 'client',
          name: 'client',
          redirect: 'appparams',
          component: Client,
          children: [
            {
              name: 'appparams',
              path: 'appparams',
              component: AppParams
            },
            {
              name: 'rdpconnect',
              path: 'rdpconnect',
              component: RdpConnect
            },
            {
              name: 'clipboard',
              path: 'clipboard',
              component: ClipBoard
            },
            {
              name: 'loginmodel',
              path: 'loginmodel',
              component: LoginModelVue
            },
            {
              name: 'mouseposition',
              path: 'mouseposition',
              component: MousePosition
            },
            {
              name: 'receivemessage',
              path: 'receivemessage',
              component: ReceiveMessage
            },
            {
              name: 'test',
              path: 'test',
              component: TestModelVue
            },
            {
              name: 'store',
              path: 'store',
              component: Store
            },
            {
              name: 'totest',
              path: 'totest',
              component: ToTest
            },
            {
              name: 'tologin',
              path: 'tologin',
              component: ToLogin
            },
            {
              name: 'loginapi',
              path: 'loginapi',
              component: ToTest
            },
            {
              name: 'tologin',
              path: 'tologin',
              component: ToLogin
            },
            {
              name: 'update',
              path: 'update',
              component: Update
            }
          ]
        },
        {
          path: 'file',
          name: 'file',
          component: File,
          redirect: 'appparams',
          children: [
            {
              name: 'fileupload',
              path: 'fileupload',
              component: FileUpload
            },
            {
              name: 'sftp',
              path: 'sftp',
              component: SFTP
            }
          ]
        },
        {
          path: 'elementUi',
          name: 'elementUi',
          component: ElementUI
        },
        {
          path: 'apis',
          name: 'apis',
          component: Apis,
          children: [
            {
              name: 'loginapi',
              path: 'loginapi',
              component: LoginApi
            },
            {
              name: 'appsapi',
              path: 'appsapi',
              component: AppsApi
            },
            {
              name: 'appparamapi',
              path: 'appparamapi',
              component: AppParamApi
            },
            {
              name: 'connectionstate',
              path: 'connectionstate',
              component: ConnectionState
            },
            {
              name: 'extapplications',
              path: 'extapplications',
              component: ExtToApp
            },
            {
              name: 'connectionparameters',
              path: 'connectionparameters',
              component: ConnectionParameters
            }
          ]
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/systemInfo',
      name: 'systemInfo',
      component: System
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//     console.log(`To : ${JSON.stringify(to)}`)
//     console.log(`from : ${JSON.stringify(from)}`)
//     console.log(`next : ${JSON.stringify(next)}`)
// })
//
// export default router
