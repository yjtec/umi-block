export default {
  routes:[
    {
      path: '/',
      routes: [
        {
          path: '/',
          redirect: '/agent',
        },
        {
          path: '/agent',
          name: '平台切换管理',
          routes: [
            {
              path: '/agent/list',
              name: '体验代理商',
              component: './AgentList',
            },
            {
              path: '/agent/store',
              name: '体验商家',
              component: './Store',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    ['umi-plugin-block-dev', {
    	layout: 'ant-design-pro'
    }],
    ['umi-plugin-react', {
      dva: true,
      locale: true,
      antd: true,
    }]
  ],
  proxy: {
    '/api': {
      target: 'http://dev.gateway.360vrsh.com/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    }
  }
}
