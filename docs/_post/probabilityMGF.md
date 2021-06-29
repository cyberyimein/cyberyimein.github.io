---
title: 矩母函数基础的复习
author: Wayne.Wong
category: Math
lang: zh-CN
tags: 
- Probability
- Note
---

> 院试的过去问很重视矩母函数，但是我记忆中概率论课程这块是快速带过的。所以稍微记录下重新理解矩母函数的过程。

<!-- more -->

## 从麦克劳林级数说起

$$
e^{x} =1+x+\frac{x^{2}}{2!}+\frac{x^{3}}{3!}+...+\frac{x^{n}}{n!}
$$

从微积分的书翻出上面这个麦克劳林级数公式，试试把x替换成tx。可以得出下面的公式。

$$
e^{tx}=1+tx+\frac{(tx)^{2}}{2!}+\frac{(tx)^{3}}{3!}+...+\frac{(tx)^{n}}{n!}
$$

试试对$t$求一阶导数和二阶导数：

$$\begin{aligned}
\frac{\mathrm{d}(e^{tx})}{\mathrm{d}t}&=0+x+\frac{t(x)^{2}}{1!}+\frac{t^2(x)^{3}}{2!}+...+\frac{t^{n-1}(x)^{n}}{(n-1)!}
\\
\frac{\mathrm{d}^{2}(e^{tx})}{\mathrm{d}t^{2}}&=0+0+x^{2}+\frac{t(x)^{3}}{1!}+...+\frac{t^{n-2}(x)^{n}}{(n-2)!}
\end{aligned}
$$

当$t=0$时，显然$(\frac{\mathrm{d}(e^{tx})}{\mathrm{d}t})_{t=0}=x$，$(\frac{\mathrm{d}^{2}(e^{tx})}{\mathrm{d}t^{2}})_{t=0}=x^{2}$。继续求导，可得出其在$t=0$的n阶导数就是$x^{n}$。

## 回到矩母函数

现在对$e^{tx}$求期望：

$$\begin{aligned}
E(e^{tx})&=E(1+tx+\frac{(tx)^{2}}{2!}+\frac{(tx)^{3}}{3!}+...+\frac{(tx)^{n}}{n!})\\
&=E(1)+E(tx)+E(\frac{(tx)^{2}}{2!})+E(\frac{(tx)^{3}}{3!})+...+E(\frac{(tx)^{n}}{n!})\\
&=E(1)+tE(x)+\frac{(t)^{2}}{2!}E(x^{2})+\frac{(t)^{3}}{3!}E(x^{3})+...+\frac{(t)^{n}}{n!}E(x^{n})
\end{aligned}
$$

现在对$t$求一阶导数和二阶导数，并让$t=0$:

$$\begin{aligned}
(\frac{\mathrm{d}[E(e^{tx})]}{\mathrm{d}t})_{t=0}&=0+E(x)+0+0+...+0\\
(\frac{\mathrm{d}^{2}[E(e^{tx})]}{\mathrm{d}t^{2}})_{t=0}&=0+0+E(x^{2})+0+...+0
\end{aligned}
$$

不难看出$E(e^{tx})$在$t=0$的n阶导数就是$E(x^{n})$,也就是n阶矩。

由此可以得出矩母函数的公式：

$$
MGF_{x}(t)=E(e^{tx})=\begin{cases}
 \sum_{x=1}^{n}e^{tx}P(x)\\
\int_{-\infty}^{+\infty}e^{tx}f(x)\mathrm{d}x
\end{cases}
$$

## 需要矩母函数的理由

~~当然是第一问就抛出来给考生一个下马威，顺便让考生算积分啦。~~

一个理由是，同样是通过运算来求矩，求导比积分容易，以指数分布的三阶矩为例：

$$
E(x^{3})=\frac{\mathrm{d}^{3}}{\mathrm{d}t^{3}}(\frac{\lambda}{\lambda-t}) \quad OR \quad E(x^{3})=\int_{0}^{+\infty}x^{3}\lambda e^{-\lambda x}\mathrm{d}x
$$

很明显是求导比较容易。

但是算矩母函数也是积分过程，这个积分也加入比较呢？

$$\begin{aligned}
MGF_{x}(t)&=\int_{0}^{+\infty}e^{tx}\lambda e^{-\lambda x}\mathrm{d}x\\
&=\lambda\int_{0}^{+\infty}e^{(t-\lambda)x}\mathrm{d}x
\end{aligned}
$$

的确指数分布是用矩母函数比较方便。

矩母函数的优点是只需要一次计算，即可在需要的时候方便获得想要的矩。

## 注意点

$MGF_{x}(0)=1$，如果要自己求矩母函数，可以用$t=0$代入验证结果。

