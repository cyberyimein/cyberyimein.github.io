(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{545:function(t,a,s){"use strict";s.r(a);var e=s(4),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("blockquote",[s("p",[t._v("本博客使用的Maker主题并没有About页面的模板，所以花了点时间研究了页面的自定义布局，并给About页面写了个布局。")])]),t._v(" "),s("h2",{attrs:{id:"动机"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动机"}},[t._v("#")]),t._v(" 动机")]),t._v(" "),s("p",[t._v("单页面没有自定义布局时，显示的效果就会像本文一样。文章页会有文章信息、授权协议、打赏、评论系统等无关信息。本人并不喜欢这样的About页面，所以准备写个自定义布局。")]),t._v(" "),s("h2",{attrs:{id:"实现过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现过程"}},[t._v("#")]),t._v(" 实现过程")]),t._v(" "),s("p",[t._v("文章的布局可以使用"),s("code",[t._v("YAML front matter")]),t._v("来指定。例如：")]),t._v(" "),s("div",{staticClass:"language-Yaml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("layout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" AboutLayout\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("文章会被渲染成 "),s("code",[t._v(".vuepress/components/AboutLayout.vue")]),t._v("布局。")]),t._v(" "),s("p",[t._v("因为本人的需求是不想要无关信息，其余样式保持不变，只需要把"),s("br"),t._v(" "),s("code",[t._v("node_modules\\vuepress-theme-maker\\components\\Post.vue")]),t._v("的"),s("code",[t._v("Post.vue")]),s("br"),t._v(" "),s("code",[t._v("node_modules\\vuepress-theme-maker\\components\\SideBar.vue")]),t._v("的"),s("code",[t._v("SideBar.vue")]),s("br"),t._v("\n注释掉不要的信息，缝合进"),s("code",[t._v("AboutLayout.vue")]),t._v("即可。")]),t._v(" "),s("h2",{attrs:{id:"成果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#成果"}},[t._v("#")]),t._v(" 成果")]),t._v(" "),s("p",[t._v("就是现在的About页面。")]),t._v(" "),s("h2",{attrs:{id:"疑问点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#疑问点"}},[t._v("#")]),t._v(" 疑问点")]),t._v(" "),s("p",[t._v("缝合出自定义布局后，About页面能正常显示...一次。出现了刷新后样式丢失的bug。\n没仔细研究过样式引用的流程，不知道样式是定义在哪个文件的，准备「万策尽きた」时，发现再import一次主题的Layout可解。额...")]),t._v(" "),s("div",{staticClass:"language-JavaScript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Layout "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuepress-theme-maker/layouts/Layout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("h2",{attrs:{id:"最后"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[t._v("#")]),t._v(" 最后")]),t._v(" "),s("p",[t._v("虽然About内容在写这篇文章的时候还没写，本博客终于迈出了Hello World后的第一步。")])])}),[],!1,null,null,null);a.default=r.exports}}]);