<template>
  <div class="theme-container">
    <div class="theme-sidebar">
      <div class="theme-sidebar__inner">
        <div class="theme-header">
          <RouterLink class="theme-header__logo" to="/">
            <img
              draggable="false"
              class="theme-header__picture"
              :src="$themeConfig.logo"
              alt="logo"
              width="160"
              height="160"/>
              <ThemePalette v-if="$themeConfig.palette"/>
          </RouterLink>
          <RouterLink class="theme-header__name" to="/">
            {{$site.title}}
          </RouterLink>
          <p class="theme-header__slogan">{{$site.description}}</p>
        </div>
        <SubNav/>
        <Navbar/>
        <FooterBar/>
      </div>
    </div>
    <div class="theme-main">
      <slot name="main">
        <div class="theme-main__inner post">
              <article
                itemscope
                itemtype="https://schema.org/BlogPosting"
              >
                <!-- <header v-if="$frontmatter.cover" :style="headerStyle" class="article__header--hasCover">
                  <div class="article__header-con">
                    <PostMeta
                      class="post-meta--hasCover"
                      :cates="$frontmatter.category || $frontmatter.categories"
                      :author="$frontmatter.author"
                      :date="$frontmatter.date"
                      :location="$frontmatter.location"
                    />
                    <hr class="article-hr"/>
                    <h1 class="post-title" itemprop="name headline">
                      {{ $frontmatter.title }}
                    </h1>
                  </div>
                </header> -->
                <header style="headerStyle" class="article__header">
                  <h1 class="post-title" itemprop="name headline">
                      {{ $frontmatter.title }}
                    </h1>
                    <!-- <PostMeta
                      :cates="$frontmatter.category || $frontmatter.categories"
                      :author="$frontmatter.author"
                      :date="$frontmatter.date"
                      :location="$frontmatter.location"
                    /> -->
                </header>
                <div class="article-con">
                  <Content class="article-content" :class="{'copy-code-enabled': $themeConfig.copy}" itemprop="articleBody" />
                  <!-- <div class="article-copyright">
                    <ul>
                      <li class="article-copyright__item">
                        <strong class="article-copyright__title">Last-updated<span>:</span></strong>
                        <p class="article-copyright__text">{{$page.lastUpdated}}</p>
                      </li>
                      <li class="article-copyright__item">
                        <strong class="article-copyright__title">Copyright<span>:</span></strong>
                        <p class="article-copyright__text">自由转载-非商用-禁止演绎-保持署名（<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh">CC
                            BY-NC-ND 4.0</a>）</p>
                      </li>
                      <li class="article-copyright__item">
                        <strong class="article-copyright__title">Link<span>:</span></strong>
                        <p class="article-copyright__text"><a :href="pageLink"
                            :title="$page.title">{{pageLink}}</a></p>
                      </li>
                    </ul>
                  </div> -->
                  <!-- <Reward v-if="isShowReward"/> -->
                </div>
                <div class="article-footer">
                  <!-- <PostTag v-if="$frontmatter.tags" :tags="$frontmatter.tags" /> -->
                  <!-- <PostNav/> -->
                  <!-- <Comments/> -->
                </div>
              </article>
            </div>
      </slot>
    </div>
    
  </div>
</template>

<script>
import Layout from 'vuepress-theme-maker/layouts/Layout';
import FooterBar from '@theme/components/FooterBar.vue'
import Navbar from '@theme/components/Navbar.vue'
import SubNav from '@theme/components/SubNav.vue'
import ThemePalette from '@theme/plugin/theme-palette/ThemePalette.vue'

import PostTag from '@theme/components/PostTag.vue'
import PostMeta from '@theme/components/PostMeta.vue'
import PostNav from '@theme/components/PostNav.vue'
import Reward from '@theme/components/Reward.vue'
import Comments from '@theme/components/Comments.vue'
export default {
  name: 'Post',
  components: {
    // PostTag,
    // PostMeta,
    // Comments,
    // PostNav,
    // Reward,
    SubNav,
    Navbar,
    FooterBar,
    ThemePalette
  },
  computed: {
    // isShowReward() {
    //   if (this.$frontmatter.reward === false) {
    //     return false;
    //   }
    //   return this.$themeConfig.reward.enable
    // },
    headerStyle() {
      if (!this.$frontmatter.cover) return;
      return {
        'background-image': `url(${this.$frontmatter.cover})`, 
        'background-color': this.$frontmatter.coverBgColor
      }
    },
    // pageLink() {
    //   return `${this.$themeConfig.hostname}${this.$page.path}`;
    // }
  }
}
</script>

<style lang="stylus">
// sidebar
.theme-sidebar
  position fixed
  top 0
  bottom 0
  left 0
  border-right 1px solid
  border-color var(--theme-border-color)
  &__inner
    display: flex;
    flex-direction column
    align-content: flex-start
    margin-right -1rem
    padding-right 1rem
    box-sizing content-box
    width $sidebarWidth
    height: 100%;
    overflow-y auto
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
}
.theme-header
  margin: 1rem 1rem 1em;
  border-radius: 6px;
  text-align: center;
  background var(--theme-card-background)
  display: inline-block;
  &__logo
    position relative
    display: inline-block;
    margin-top: 2.4rem;
    &:hover
      .theme-palette
        display flex 
    .theme-palette
      position: absolute;
      bottom: 20px;
      left : 100px;
  &__picture
    padding: 2px;
    width: 8rem;
    height: 8rem;
    border: 1px solid;
    border-radius: 50%;
    border-color rgba(96,125,139,.4)
    vertical-align: bottom;
    box-sizing content-box
  &__name
    font-family: var(--theme-font-logo);
    display block
    margin: 1.5rem;
    font-size: 1.714285rem;
    transition: color .15s;
  &__slogan
    padding: 0 1.6rem 1rem;
    line-height: 1.5;
    opacity: .63;

.post
  background var(--theme-card-background) 
  border-radius: 6px;
  line-height 1.8
  color var(--theme-foreground-color)
  h2, h3, h4, h5, h6
    margin: 2rem 0 1rem;
    font-weight: 700;
.article-content
  a
    border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article__header
  .post-title
    padding: 4.3rem 2.15rem 2.15rem;
    margin 0
  .post-meta
    padding: 0px 2.15rem;
    line-height: 3;
    background-color: var(--theme-accent-color-01);
.article__header--hasCover
  border-radius: 6px;
  padding-top: 37%;
  background-position: 50% center;
  background-size: cover;
  color: rgb(255, 255, 255);
.article__header-con
  padding: 2.5rem 2.15rem 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
.article-copyright
  display: block;
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  background-color: var(--theme-accent-color-005);
  border-left: 3px solid var(--theme-accent-color);
  border-radius: 3px;
  word-break: break-word;
  line-height: 1.8;
  ul
    margin 0
    padding-left 0
  &__item
    display flex
    line-height 2
    align-items flex-start
    span
      margin: 0 .6em 0 .2em;
    p
      line-height 2
      margin 0
  &__title
    height 2em
    white-space nowrap
.article-con
  padding: 0.80625rem 2.15rem 2.15rem;
.article-footer
  padding: 0 2.15rem;
  border-color: var(--theme-border-color);
  .vssue
    padding: 10px 0;
.article-hr
  margin: .7rem 0 1rem;
  height: 2px;
  border: 0;
  background: #fff;
  opacity: .5;
  animation: .4s both;
  animation-name: line-scale;
.footnote-ref a
  &:link, &:visited
    color var(--theme-accent-color)!important
abbr
  cursor help
@media (max-width: $MQMobile)
  .post-title
    margin-top 0
</style>