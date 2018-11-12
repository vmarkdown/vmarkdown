## LaTeX

The editor converts LaTeX equations in double-dollars `$$`: $$ax^2+bx+c=0$$. All equations are rendered as block equations. If you need inline ones, you can add the prefix `\inline`: $$\inline p={1\over q}$$. But it is a good practice to place big equations on separate lines:

$$
x_{1,2} = {-b\pm\sqrt{b^2 - 4ac} \over 2a}.
$$

In this case the LaTeX syntax will be highlighted in the source code. You can even add equation numbers (unfortunately there is no automatic numbering and refs support):

$$
|\vec{A}|=\sqrt{A_x^2 + A_y^2 + A_z^2}.
$$(1)

