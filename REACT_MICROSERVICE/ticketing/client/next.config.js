const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    },
    async headers() {
        return [
        {   
            source: "/(.*)", 
            headers: createSecureHeaders(), 
            poweredByHeader: false,
            
            
        }
        ];
    },
};
//poll all files every 300s
//also sometimes you may want to kill the pod using kubectl for file
//changes to take place
