if(document.getElementsByTagName("title")[0].text === 'Title'){
    document.title = '练习'
}

window.onload=function (){
    document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",headNavBar)
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",footerHtml)
}



const host = 'http://127.0.0.1:8888'

function $ById(id){
    return document.getElementById(id);
}
function $ByTag(key,value){
    return document.getElementsByTagNameNS(key,value);
}

//缩放图片到合适大小
function ResizeImages()
{
    let myimg, oldwidth, oldheight;
    let maxwidth=550;
    let maxheight=880
    let imgs = document.getElementById('article').getElementsByTagName('img');   //如果你定义的id不是article，请修改此处

    for(let i=0;i<imgs.length;i++){
        myimg = imgs[i];

        if(myimg.width > myimg.height)
        {
            if(myimg.width > maxwidth)
            {
                oldwidth = myimg.width;
                myimg.height = myimg.height * (maxwidth/oldwidth);
                myimg.width = maxwidth;
            }
        }else{
            if(myimg.height > maxheight)
            {
                oldheight = myimg.height;
                myimg.width = myimg.width * (maxheight/oldheight);
                myimg.height = maxheight;
            }
        }
    }
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
                        <li><a class="dropdown-item" href="#">没有更多</a></li>
                        <li><a class="dropdown-item" href="#">没有更多</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">没有更多</a></li>
                    </ul>
                </li>
            </ul>
            <div class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="搜索" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">search</button>
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
      <h5>练习1-1</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">主页</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习One</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习One</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习One</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">关于</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>练习1-2</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">主页</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习Two</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习Two</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">练习Two</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">关于</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>练习1-3</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
      </ul>
    </div>
  </footer>
</div>
`