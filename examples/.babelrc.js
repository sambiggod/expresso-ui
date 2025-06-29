module.exports = {
    "plugins": [
        ["import", {
            "libraryName": "azong",
            camel2UnderlineComponentName: false,
            camel2DashComponentName: false,
            customName: function (name) {
                console.log('name', name)
                if (!map[name]) {
                    console.log(name);
                }
                return `my-react/src${map[name]}`;
            }
        }]
    ]
}