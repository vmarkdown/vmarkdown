const remark = require('remark')
const math = require('remark-math')
const katex = require('remark-html-katex') // Use remark-html-katex
const html = require('remark-html')

// Raw String => MDAST => transformed MDAST => HTML
const processor = remark()
    .use(math)
    .use(katex)
    .use(html)


const rawString = `
$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$
`

const result = processor.processSync(rawString).toString();

console.log(result);

/* result
<p>
  Lift(<span class="inlineMath"><span class="katex">...</span></span>) can be determined by Lift Coeeficient (<span class="inlineMath"><span class="katex">...</span></span>) like the following equation.
</p>
<div class="math">
  <span class="katex-display"><span class="katex">...</span></span>
</div>
*/