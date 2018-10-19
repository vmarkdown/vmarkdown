const NodeUtil = require("./util/node");
const vremark = require('vremark');
const Event = require('./util/event');
class VMarkDown {

    constructor(options) {
        const self = this;
        self.options = options || {};
        self.value = '';
        self.hast = {};
        // self._bindEvents(self.options);
    }

    _bindEvents(options) {
        const self = this;

        if(options.eventListener === 'storage') {

            window.addEventListener("storage", function(event){
                const key = event.key;
                const value = event.newValue;
                switch (key) {
                    case 'change':{
                        self.setValue(value);
                        break;
                    }
                    case 'cursorChange':{
                        let cursor = JSON.parse(value);
                        self.emit('cursorChange', cursor);
                        break;
                    }
                    case 'firstVisibleLineChange':{
                        let firstVisibleLine = parseInt(value, 10);
                        self.emit('firstVisibleLineChange', firstVisibleLine);
                        break;
                    }
                }
            });

        }
    }

    setValue(value) {
        this.value = value;
        this.emit('change', value);
    }

    getValue() {
        return this.value;
    }

    compile(h) {
        const self = this;

        console.time('all');

        const hast = vremark.parse(self.value, self.options);

        self.hast = hast;

        const vdom = vremark.render(hast, Object.assign({}, self.options, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        }));

        console.timeEnd('all');

        return vdom;
    }

    findNodeFromLine(line) {
        const self = this;
        const node = NodeUtil.findNodeFromLine(self.hast, line);
        return node;
    }

    findNodeByLine(line) {
        const self = this;
        const node = NodeUtil.findNodeByLine(self.hast, line);
        return node;
    }

    findNode(position) {
        const self = this;
        const node = NodeUtil.findNode(self.hast, position);
        return node;
    }
}

Event.mixin(VMarkDown);

module.exports = VMarkDown;