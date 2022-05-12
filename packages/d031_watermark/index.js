window.onload = function (){
    setTimeout(()=>{
        console.log('水印执行了');
        embedWatermark('demo');
    },500)
}


const roottNode = document.documentElement || document.body;

const watermarkStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
}

const itemStyle = {
    position: 'absolute',
    top: '200px',
    left: '50px',
    fontSize: '24px',
    color: '#000',
    lineHeight: 1.5,
    opacity: 0.1,
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
    const wrapWidth = 500;
    const wrapHeight = 300;
    const { clientWidth, clientHeight } = roottNode;
    const column = Math.ceil(clientWidth / wrapWidth);
    const rows = Math.ceil(clientHeight / wrapHeight);
    const watermarkDom = document.createElement('div');
    cssHelper(watermarkDom, watermarkStyle);

    const wrapStyle = {
        position: 'relative',
        width: `${wrapWidth}px`,
        height: `${wrapHeight}px`,
        flex: `0 0 ${wrapWidth}px`,
        overflow: 'hidden',
    }

    for (let i = 0; i < column * rows; i++) {
        const wrap = document.createElement('div');
        cssHelper(wrap, wrapStyle);
        wrap.appendChild(createItem(username));
        watermarkDom.appendChild(wrap)
    }
    document.body.appendChild(watermarkDom)
    observeWatermarkDom(watermarkDom)
    
}

function observeWatermarkDom(){
    
    // 选择需要观察变动的节点
    // const targetNode = document.getElementById('some-id');

    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true };

    // 当观察到变动时执行的回调函数
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                mutation.removedNodes.forEach(item => {
                    // todo
                });
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
                if(mutation.target){
                    // todo
                }
            }
            console.log(mutation)
        }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(roottNode, config);

    // 之后，可停止观察
    // observer.disconnect();
}


