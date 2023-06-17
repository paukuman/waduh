async function fetchJson(url) {
    const get = await fetch(url);
    const json = await get.json();
    return json;
}

window.addEventListener('load', () => {
    var prevHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != prevHash) {
            prevHash = window.location.hash;
            window.location.reload();
        }
    }, 100);
});