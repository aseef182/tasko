module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
            @import "@/styles/_variables.scss";
            @import "@/styles/_mixins.scss";
          `
            }
        }
    }
};