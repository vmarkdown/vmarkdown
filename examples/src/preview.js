const vmarkdown = require('./vmarkdown');

const preview = new VMarkDownPreview({
    container: '#app',
    scrollContainer: '#preview',
    vmarkdown: vmarkdown
});

module.exports = preview;