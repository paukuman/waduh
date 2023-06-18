async function fetchJson(url) {
    const get = await fetch(url);
    const json = await get.json();
    return json;
}

async function mainFunction() {
    let data, json, open;
    if (!window.location.hash) {
        let { blocks } = await fetchJson('https://api.modules.my.id/v2/models');
        
        open = blocks.length;
        json = blocks;
        data = { json, part: 'assets/part/home.html' };
    } else {
        const username = window.location.hash.substring(1);
        let cam = await fetchJson(`https://api.modules.my.id/v2/models/username/${username}/cam`);
        
        open = true;
        json = cam.user;
        data = { json, part: 'assets/part/home.html' };
    }

    return { data, open };
}

function showTitle(id) {
    const json = {
        countryGenderModels: "Featured Live Sex Shows",
        mostPopularModels: "Popular Models",
        couplesModels: "Couples Live Sex Cams",
        newModel: "New & Trending Girls",
        vrModels: "VR Cams",
        topStreamsModels: "Top Free Live Webcams"
    }

    return json[id];
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