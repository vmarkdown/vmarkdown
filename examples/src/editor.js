const CodeMirrorEditor = require('../assets/vmarkdown-codemirror-editor');
const editor = new CodeMirrorEditor(document.getElementById('editor'), {

});

editor.setValue(
`# h1
# h2
`);

module.exports = editor;