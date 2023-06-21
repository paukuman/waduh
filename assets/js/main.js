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

const getParams = function() {

    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
};

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

async function countModel() {
    const { count } = await fetchJson('https://api.modules.my.id/models/count');
    let countEl = document.querySelector('.navbar-brand .count');
    
    countEl?countEl.textContent = `${count} Online`:false;
    setTimeout(() => countModel(), 3000);
}

async function liveChat(username) {
    const { messages } = await fetchJson(`https://api.modules.my.id/v2/models/username/${username}/chat?source=regular`);
    let chat = document.querySelector('.chat');
    chat.innerHTML = '';
    if(chat) {
        for(let message of messages.reverse()) {
            let body = '';
            let {details, userData} = message;
            let child = document.createElement('div');
            let ranking = userData.userRanking;
            let lovenseDetails = details.lovenseDetails;
            if(lovenseDetails) {
                let {detail} = lovenseDetails;
                let {name, amount, power, time, specialActualValue} = detail
                if(power) {
                    body = `<span class="lovense"><b>${power?power:specialActualValue}</b> <i>${time} sec</i> by ${name}</span>`;
                } else {
                    body = `<span class="tipped"><b>${name}</b> tipped ${amount}tk</span>`;
                }
            } else {
                body = `<span class="username">${userData.username}</span><span>${details.body}</span><span class="level">Level ${ranking?ranking.level:''}[${ranking?ranking.league:''}]</span>`;
            }

            child.classList.add('message');
            chat.appendChild(child);
            child.innerHTML = body;
        }
    }

    setTimeout(() => liveChat(username), 3000);
}

window.addEventListener('load', () => {

    //countModel
    countModel();

    var prevHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != prevHash) {
            prevHash = window.location.hash;
            window.location.reload();
        }
    }, 100);
});