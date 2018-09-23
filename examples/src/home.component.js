const { h, Component } = preact;
import renderer from 'remark-preact-renderer';
import VMarkdown from 'vmarkdown';
const vmarkdown = new VMarkdown({
    h: h,
    renderer: renderer,
    lineNumbers: false
});


const md = require('../assets/demo.md');

const OFFSET_DISTANCE = 100;
function findNode(nodes, top) {
    // for(let i=0;i<nodes.length;i++) {
    //     let node = nodes[i];
    //
    //     if( top>= node.top ) {
    //         return node;
    //     }
    // }

    if(nodes.length === 0) return null;

    if(top < 2) {
        return nodes[0].node;
    }

    console.log(top);

    for(let i=nodes.length-1;i>=0;i--) {
        let node = nodes[i];

        if( (top+OFFSET_DISTANCE) >= node.top ) {
            return node.node;
        }
    }


    return null;
}

export default class Home extends Component {

    componentDidMount() {
        // vmarkdown.buildScrollMap();

        const previewContainer = $('.markdown-body');
        // const previewContainerTop = previewContainer.offset().top;

        previewContainer.children().each(function (i, node) {
            const $node = $(node);
            const position = $node.position();
            const id = node.localName+'_'+i;
            $node.attr('id', id).css('position','relative');
            $(document.head).append(` <style> #${id}:before{ content:'${position.top}';position:absolute;width:100%;height:100%;box-sizing: border-box;background-color: #00000033; left: 0;color: red;text-align: right;} </style> `);
        });


        $(document.body).append(`
            <style>.scroll-distance { 
                position: fixed;
                top: 10px;
                right: 10px; 
                width: 100px;
                color: red;
                border: 1px solid red;
                box-sizing: border-box;
            }
            </style>
            <div class="scroll-distance"><span id="scroll-distance">0</span> px</div>
        `);

        $(document.body).append(`
            <style>.base-line { 
                position: fixed;
                top: 100px;
                left: 0; 
                border-top: 1px solid red; 
                width: 100%;
                height: 1px; 
            }
            </style>
            <div class="base-line"></div>
        `);


        const map = previewContainer.children().map(function (i, node) {
            const position = $(node).position();
            return {
                top: position.top,
                node: node
            };
        });

        console.log(map);

        function calc() {
            // console.log(document.documentElement.scrollTop);
            const bodyTop = document.documentElement.scrollTop;

            const distanceTop = bodyTop; //- previewContainerTop;

            console.log(distanceTop);

            $('#scroll-distance').text(distanceTop);

            // if(distance<0){
            //     console.log('markdown-body disappear');
            // }

            const node = findNode(map, distanceTop);

            // console.log(node);

            if(node){
                previewContainer.find('.active').removeClass('active');
                $(node).addClass('active');
            }
        }

        $(window).scroll(function () {
            calc();
        });

        calc();

        /*

        const previewContainer = $('.markdown-body');
        // const pcDistance = previewContainer.offset().top;



        */


    }

    render() {
        const vdom = vmarkdown.render(md);
        return vdom;
    }
}