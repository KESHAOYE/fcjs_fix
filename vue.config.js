module.exports={
    publicPath:"/",
    devServer:{
        host:"127.0.0.1",
        port:8080,
        proxy:{
        '/api':{
            target:"http://localhost:3000",
            changeOrigin:true,
            ws:true,
            secure: false,
            pathRewrite:{
                "^/api":'/'
            }
        }
    }
  }
}
