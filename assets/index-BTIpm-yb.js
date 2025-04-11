(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();const a=document.querySelector("#searchInput"),l=document.querySelector("#animeList"),c=document.querySelector("#animeDetails"),p=document.querySelector("#searchBtn");a.addEventListener("keydown",r=>{if(r.key==="Enter"){const s=a.value.trim();s.length>2&&d(s)}});p.addEventListener("click",()=>{const r=a.value.trim();r.length>2&&d(r)});async function d(r){const e=await(await fetch(`https://api.jikan.moe/v4/anime?q=${r}&limit=10`)).json();l.innerHTML="",c.classList.add("hidden"),e.data.forEach(i=>{const t=document.createElement("div");t.classList.add("anime-item"),t.textContent=i.title,t.addEventListener("click",()=>u(i.mal_id)),l.appendChild(t)})}async function u(r){var i;const s=await fetch(`https://api.jikan.moe/v4/anime/${r}`),{data:e}=await s.json();c.innerHTML=`
    <h2>${e.title}</h2>
    <img src="${e.images.jpg.image_url}" alt="${e.title}" width="200"/>
    <p><strong>Original title:</strong> ${e.title_japanese}</p>
    <p><strong>Episodes:</strong> ${e.episodes}</p>
    <p><strong>Status:</strong> ${e.status}</p>
    <p><strong>Rating:</strong> ${e.rating}</p>
    <p><strong>Score:</strong> ${e.score||"N/A"} (${e.scored_by} votes)</p>
    <p><strong>Type:</strong> ${e.type}</p>
    <p><strong>Season:</strong> ${e.season||"Unknown"} ${e.year||""}</p>
    <p><strong>Duration:</strong> ${e.duration}</p>
    <p><strong>Genres:</strong> ${e.genres.map(t=>t.name).join(", ")}</p>
    <p>${e.synopsis||"No synopsis available."}</p>
    ${(i=e.trailer)!=null&&i.url?`<a href="${e.trailer.url}" target="_blank">Watch Trailer</a><br>`:""}
    <a href="${e.url}" target="_blank">View on MyAnimeList</a>
  `,c.classList.remove("hidden")}
