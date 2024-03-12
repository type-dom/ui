# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

    <td-container>：外层容器。 
        当子元素中包含 <td-header> 或 <td-footer> 时，全部子元素会垂直上下排列，
        否则会水平左右排列。
    
    <td-header>：顶栏容器。
    
    <td-aside>：侧边栏容器。
    
    <td-main>：主要区域容器。
    
    <td-footer>：底栏容器。

TIP
``` 
    以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， <td-container>的直接子元素必须是后四个组件中的一个或多个。
后四个组件的亲元素必须是一个 <td-container>
```
