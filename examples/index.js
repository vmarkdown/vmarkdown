const { h, render } = preact;
import HomeComponent from './src/home.component';
// // render(h(HomeComponent), document.getElementById('app'));
$(function () {
    render(h(HomeComponent), document.body);
});


// const{ h, render, Component } = preact;
//
// class Clock extends Component {
//     constructor() {
//         super();
//         // 设置初始的时间
//         this.state.time = Date.now();
//     }
//
//     componentDidMount() {
//         // 每秒都更新一下时间
//         this.timer = setInterval(() => {
//             this.setState({ time: Date.now() });
//         }, 1000);
//     }
//
//     componentWillUnmount() {
//         // 当不再渲染，停止计时器
//         clearInterval(this.timer);
//     }
//
//     render(props, state) {
//         let time = new Date(state.time).toLocaleTimeString();
//         return h('span', {}, '==='+time);
//     }
// }
//
// $(function () {
//
// // import { h, render, Component } from 'preact';
//
//
//
//     render(h(Clock), document.body);
//
// });



