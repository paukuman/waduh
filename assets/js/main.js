async function fetchJson(url) {
    const get = await fetch(url);
    const json = await get.json();
}