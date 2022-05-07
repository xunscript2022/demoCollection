window.onload = function (){
    setTimeout(()=>{
        console.log('水印执行了');
        embedWatermark();
    },500)
}

const wrapStyle = {
    position: 'absolute',
    top: '50%',
    left: '20%',
    fontSize: '32px',
    color: '#000',
    lineHeight: 1.5,
    opacity: 0.4,
    transform: `rotate(-15deg)`,
    transformOrigin: '0 0',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
} 

function cssHelper(el, wrapStyle) {
    for (let i in wrapStyle) {
        el.style[i] = wrapStyle[i]
    }
}

function embedWatermark(username){
    const wrapDom = document.createElement('div');
    wrapDom.innerHTML = `${username || window.username} ${new Date()}`;
    cssHelper(wrapDom, wrapStyle);
    document.body.appendChild(wrapDom);
}


