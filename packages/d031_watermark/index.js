window.onload = function (){
    setTimeout(()=>{
        console.log('水印执行了');
        embedWatermark('demo');
    },500)
}

const watermarkStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
}

const itemStyle = {
    position: 'absolute',
    top: '200px',
    left: '50px',
    fontSize: '14px',
    color: '#000',
    lineHeight: 1.5,
    opacity: 0.4,
    transform: `rotate(-15deg)`,
    transformOrigin: '0 0',
    //使文字无法被使用
    userSelect: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    //使元素实体虚化，不触发鼠标事件
    //pointervents: none
} 

function cssHelper(el, domStyle) {
    for (let i in domStyle) {
        el.style[i] = domStyle[i]
    }
}

function createItem(username){
    const itemDom = document.createElement('div');
    itemDom.innerHTML = `${username || window.username} ${new Date()}`;
    cssHelper(itemDom, itemStyle);
    return itemDom;
}


function embedWatermark(username){
    const waterHeight = 400;
    const waterWidth = 150;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column = Math.ceil(clientWidth / waterWidth);
    const rows = Math.ceil(clientHeight / waterHeight);
    const watermarkDom = document.createElement('div');
    cssHelper(watermarkDom, watermarkStyle);

    const wrapStyle = {
        position: 'relative',
        width: `500px`,
        height: `300px`,
        // flex: `0 0 500px`,
        overflow: 'hidden',
    }

    for (let i = 0; i < column * rows; i++) {
        const wrap = document.createElement('div');
        cssHelper(wrap, wrapStyle);
        wrap.appendChild(createItem(username));
        watermarkDom.appendChild(wrap)
    }
    document.body.appendChild(watermarkDom)
    
}




