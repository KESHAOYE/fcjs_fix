module.exports={
    publicPath:"/",
    devServer:{
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
