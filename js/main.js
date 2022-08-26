const host = 'http://127.0.0.1:8001'


if(document.getElementsByTagName("title")[0].text === 'Title'){
    document.title = '练习'
}

window.onload=function (){
    document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",headNavBar)
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",footerHtml)
}



const headNavBar = `
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">练习</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">首页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">关于</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        更多...
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/welcome/pages/article/edit.html">编辑</a></li>
                        <li><a class="dropdown-item" href="/welcome/pages/article/view.html?article_code=11111">编辑</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">没有更多</a></li>
                    </ul>
                </li>
            </ul>
            <div class="d-flex" role="search">
                <input class="form-control me-2" type="search" id="index_search_value" placeholder="搜索" aria-label="Search">
                <input class="btn btn-outline-success" type="button" value="搜素" id="index_search_button"></input>
            </div>
        </div>
    </div>
</nav>
`

const footerHtml = `
<div class="container">
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div class="col mb-3">
      <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      </a>
      <p class="text-muted">练习项目&copy; 2022</p>
    </div>

    <div class="col mb-3">

    </div>

    <div class="col mb-3">
      <h5>前端</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="https://cdnjs.com/" class="nav-link p-0 text-muted">cdnjs</a></li>
        <li class="nav-item mb-2"><a href="https://v5.bootcss.com/" class="nav-link p-0 text-muted">bootstrap</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Java</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="https://docs.oracle.com/javase/8/docs/" class="nav-link p-0 text-muted">java8</a></li>
        <li class="nav-item mb-2"><a href="https://www.springcloud.cc/" class="nav-link p-0 text-muted">springcloud中文网</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>其他</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="https://www.hltv.org/" class="nav-link p-0 text-muted">HLTV</a></li>
        <li class="nav-item mb-2"><a href="https://www.bilibili.com/" class="nav-link p-0 text-muted">哔哩哔哩</a></li>
        <li class="nav-item mb-2"><a href="https://www.douyu.com/" class="nav-link p-0 text-muted">斗鱼</a></li>
        <li class="nav-item mb-2"><a href="https://www.huya.com/" class="nav-link p-0 text-muted">虎牙</a></li>
        <li class="nav-item mb-2"><a href="https://v.qq.com/" class="nav-link p-0 text-muted">腾讯视频</a></li>
        <li class="nav-item mb-2"><a href="https://youku.com/" class="nav-link p-0 text-muted">优酷视频</a></li>
      </ul>
    </div>
  </footer>
</div>
`