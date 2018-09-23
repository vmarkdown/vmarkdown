const { h, Component } = preact;
import renderer from 'remark-preact-renderer';
import VMarkdown from 'vmarkdown';
const vmarkdown = new VMarkdown({
    h: h,
    renderer: renderer,
    lineNumbers: false
});


const md = require('../assets/demo.md');

export default class Home extends Component {

    componentDidMount() {
        vmarkdown.buildScrollMap();
    }

    render() {
        const vdom = vmarkdown.render(md);
        return vdom;
    }
}