export default {
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
