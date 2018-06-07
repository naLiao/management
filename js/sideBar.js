//点击子菜单展开
sideBarClick('up','newsEdit',3);
sideBarClick('ad','adEdit',2);

function sideBarClick(parent,child,num) {
    parent = document.querySelector('.'+parent);
    child = document.querySelector('.'+child);

    parent.onclick = function () {
        if(getComputedStyle(child).height===num*35+'px'){
            child.style.height = '0px';
        }else if(getComputedStyle(child).height==='0px'){
            child.style.height = num*35+'px';
        }
    }
}

const newsEdit = document.querySelector('.newsEdit');
newsEdit.onclick = function (ev) {
    if(ev.target.tagName === 'A'){
        for(let i=0;i<newsEdit.children.length;i++){
            newsEdit.children[i].classList.remove('select');
        }
        ev.target.classList.add('select');
    }
}
