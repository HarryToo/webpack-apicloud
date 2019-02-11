window.onload = function () {
    document.body.insertAdjacentHTML('beforeend', `<div draggable="true" style="position: fixed;right: 0.1rem;bottom: 0.1rem;
                z-index: 99999;width: 0.42rem;height: 0.42rem;line-height: 0.42rem;text-align: center;background-color: rgba(119,223,149,0.8);
                color: #fff;border-radius: 50%;box-shadow: 1px 1px 6px rgba(0,0,0,0.2);" tapmode="tapmode" onclick="location.reload()">⚡</div>`);
};