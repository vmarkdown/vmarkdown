/**
 * Renderer
 */

let index = 0;
function uniqueId(prefix) {
    return prefix + index++;
}


function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(node, children) {
    const h = this.options.h;
    return h('div', {
        key: uniqueId('div_'),
        className: 'markdown-body'
    }, children);
};


Renderer.prototype.inlineCode = function(node) {
    const h = this.options.h;
    return h('code', {
        key: uniqueId('code_')
    }, node.value);
};



Renderer.prototype.math = function(node) {
    debugger
    const h = this.options.h;
    return h('div', {
        key: uniqueId('inlineMath_')
    }, node.value);
};

Renderer.prototype.inlineMath = function(node) {
    const h = this.options.h;
    return h('span', {
        key: uniqueId('html_'),
        dangerouslySetInnerHTML: {
            __html: node.renderedValue
        }
    });
};



Renderer.prototype.code = function(node, children) {
    const h = this.options.h;
    return h('pre', {
        key: uniqueId('pre_')
    }, [
        h('code', {
            key: uniqueId('code_'),
            className: 'language-'+node.lang
        }, node.value)
    ]);
};

Renderer.prototype.blockquote = function(node, children) {
    const h = this.options.h;
    return h('blockquote', {
        key: uniqueId('blockquote_')
    }, children);
};

Renderer.prototype.html = function(node, children) {
    const h = this.options.h;

    return h('div', {
        key: uniqueId('html_'),
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    });

    // return h('div', {
    //     key: uniqueId('html_'),
    //     'data-render': 'html'
    // }, node.value);

    // debugger
    // const h = this.options.h;
    // return h('div', {
    //     key: uniqueId('html_'),
    //     'data-render': 'html'
    // }, node.value);
};

Renderer.prototype.heading = function(node, children) {
    const h = this.options.h;
    return h('h'+node.depth, {
        key: uniqueId('heading_')
    }, children);
};

Renderer.prototype.thematicBreak = function() {
    const h = this.options.h;
    return h('hr', {
        key: uniqueId('hr_')
    });
};


Renderer.prototype.list = function(node, children) {
    const h = this.options.h;
    return h(node.ordered?'ol':'ul', {
        key: uniqueId('list_'),
    }, children);
};

Renderer.prototype.listItem = function(node, children) {
    const h = this.options.h;
    return h('li', {
        key: uniqueId('listItem_')
    }, children);
};

Renderer.prototype.checkbox = function(node) {
    const h = this.options.h;
    return h('input', {
        key: uniqueId('checkbox_'),
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    });
};

Renderer.prototype.paragraph = function(node, children) {
    const h = this.options.h;
    return h('p', {
        key: uniqueId('paragraph_')
    }, children);
};

Renderer.prototype.table = function(node, children) {
    const h = this.options.h;
    return h('table', {
        key: uniqueId('table_')
    }, [
        h('tbody',{
            key: uniqueId('tbody_')
        }, children)
    ]);
};

Renderer.prototype.tableRow = function(node, children) {
    const h = this.options.h;
    return h('tr', {
        key: uniqueId('tableRow_')
    }, children);
};

Renderer.prototype.tableCell = function(node, children) {
    const h = this.options.h;
    return h('td', {
        key: uniqueId('tableCell_'),
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(node, children) {
    const h = this.options.h;
    return h('strong', {
        key: uniqueId('strong_')
    }, children);
};

Renderer.prototype.emphasis = function(node, children) {
    const h = this.options.h;
    return h('em', {
        key: uniqueId('emphasis_')
    }, children);
};

Renderer.prototype.codespan = function(text) {
};

Renderer.prototype.br = function() {
};

Renderer.prototype.delete = function(node, children) {
    const h = this.options.h;
    return h('del', {
        key: uniqueId('delete_'),
    }, children);
};

Renderer.prototype.link = function(node, children) {
    const h = this.options.h;
    return h('a', {
        key: uniqueId('link_'),
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.linkReference = function(node, children) {
    // debugger
    // const h = this.options.h;
    // return h('a', {
    //     key: uniqueId('link_'),
    //     href: node.url,
    //     title: node.title
    // }, children);
};

Renderer.prototype.definition = function(node, children) {
    // debugger
    // const h = this.options.h;
    // return h('a', {
    //     key: uniqueId('link_'),
    //     href: node.url,
    //     title: node.title
    // }, children);
};


Renderer.prototype.image = function(node) {
    const h = this.options.h;
    return h('img', {
        key: uniqueId('image_'),
        src: node.url,
        alt: node.alt,
        title: node.title
    });
};

Renderer.prototype.text = function(node) {
    const h = this.options.h;
    return h('span', {
        key: uniqueId('text_'),
    }, node.value);
};

module.exports = Renderer;
