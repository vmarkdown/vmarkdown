async function loadPlugin(plugin, has, load, register) {

    // const plguin
    if(has(plugin)){
        return true;
    }

    return new Promise(async function (resolve, reject) {

        const component = await load(plugin);

        component && register(component);

        resolve(component);

        // requirejs([name+'.plugin'], function (module) {
        //     const component = module.default || module;
        //     register && register(name, component);
        //     resolve(component);
        // }, function (e) {
        //     // console.error(e);
        //     resolve();
        // });



        // require.ensure(['../../src/plugins/vremark-plugin-highlight/component/vremark-highlight'], function(require) {
        //     var a = require("module-a");
        //     // ...
        // });

        // const path = '../../src/plugins/'+name+'/component/'+name+'.js';

        // require.ensure([path], function(require) {
        //     const component = require(path);
        //     resolve(component);
        // }, name);

        // debugger
        //
        // import(name).then(function (component) {
        //     debugger
        // });


    });

}

module.exports = async function loadPlugins(plugins, has, load, register) {

    const loads = Object.keys(plugins).map(function (name) {
        const plugin = plugins[name];
        return loadPlugin(plugin, has, load, register);
    });

    return await Promise.all(loads);

};