// ==UserScript==
// @name         Steam Pirate
// @namespace    https://store.steampowered.com/
// @version      1.0.2
// @description  A Tampermonkey script that add links to torrents for Steam app page
// @author       shishkevichd
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=store.steampowered.com
// @downloadURL  https://raw.githubusercontent.com/shishkevichd/steam-torrents/master/steamPirate.user.js
// @updateURL    https://raw.githubusercontent.com/shishkevichd/steam-torrents/master/steamPirate.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const searchProviders = [
        {
            title: "Online Fix",
            url: "https://online-fix.me/index.php?do=search&subaction=search&story=#game#"
        },
        {
            title: "Skidrow",
            url: "https://www.skidrowreloaded.com/?s=#game#&x=0&y=0"
        },
        {
            title: "FitGirl",
            url: "https://fitgirl-repacks.site/?s=#game#"
        },
        {
            title: "SteamRIP",
            url: "https://steamrip.com/?s=#game#"
        },
        {
            title: "Dodi",
            url: "https://dodi-repacks.site/?s=#game#"
        },
        {
            title: "Gload",
            url: "https://gload.to/?s=#game#"
        },
        {
            title: "Steam Repacks",
            url: "https://steam-repacks.com/?s=#game#&post_type=post"
        }
    ]

    if (document.getElementById("appHubAppName") != null) {
        const gameName = document.getElementById("appHubAppName").textContent.trim().toLowerCase().replace(/'/g, '').replace(/_/g, ' ');

        let app_torrents_links__content = document.createElement("div")
        app_torrents_links__content.className = "block responsive_apppage_details_left game_details underlined_links"
        app_torrents_links__content.id = "appTorrentsUnderlinedLinks"

        let app_torrents_links__blockContent = document.createElement("div")
        app_torrents_links__blockContent.className = "block_content";

        let app_torrents_links__blockContentInner = document.createElement("div")
        app_torrents_links__blockContentInner.className = "block_content_inner"

        let app_torrents_links__detailsBlock = document.createElement("div")
        app_torrents_links__detailsBlock.className = "details_block"

        let app_torrents_links__detailsBlockHeader = document.createElement("div")
        app_torrents_links__detailsBlockHeader.className = "block_header"
        let app_torrents_links__detailsBlockHeaderH4 = document.createElement("h4")
        app_torrents_links__detailsBlockHeaderH4.innerText = "Torrents"
        app_torrents_links__detailsBlockHeader.appendChild(app_torrents_links__detailsBlockHeaderH4)

        app_torrents_links__content.appendChild(app_torrents_links__blockContent)
        app_torrents_links__blockContent.appendChild(app_torrents_links__blockContentInner)
        app_torrents_links__blockContentInner.appendChild(app_torrents_links__detailsBlock)
        app_torrents_links__detailsBlock.appendChild(app_torrents_links__detailsBlockHeader)

        searchProviders.forEach((provider) => {
            let torrent_link = document.createElement("a")
            torrent_link.className = "linkbar"
            torrent_link.href = provider.url.replace("#game#", gameName)
            torrent_link.target = "_blank"
            torrent_link.rel = "noreferrer noopener"
            torrent_link.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${new URL(provider.url).hostname}" style="width: 16px; height: 16px;"> ${provider.title} <img src="https://store.cloudflare.steamstatic.com/public/images/v5/ico_external_link.gif" border="0" align="bottom">`

            app_torrents_links__detailsBlock.append(
                torrent_link
            )
        })

        let game_meta_data_column = document.querySelectorAll("div.rightcol.game_meta_data")[0]

        game_meta_data_column.prepend(app_torrents_links__content)
    }
})();