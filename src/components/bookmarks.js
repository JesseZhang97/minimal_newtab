function getFaviconUrl(url) {
    const faviconUrl = new URL(chrome.runtime.getURL("/_favicon/"));
    faviconUrl.searchParams.set("pageUrl", url);
    faviconUrl.searchParams.set("size", "16");
    return faviconUrl.toString();
}

function processBookmarks(settings, nodes, container, level = 0, path = "", topLevelFolder = "") {
    nodes.forEach(node => {
        const currentPath = `${path}/${node.title || "Untitled"}`;

        if (node.children && node.children.length > 0) {
            const currentTopLevelFolder = topLevelFolder || node.title || "Untitled folder";
            const listItem = document.createElement('li');
            listItem.className = 'bookmark-folder-item';

            const folderButton = document.createElement('button');
            folderButton.type = 'button';
            folderButton.className = 'bookmark-folder';
            const chevron = document.createElement('span');
            chevron.className = 'chevron';
            chevron.textContent = '▶';

            const title = document.createElement('span');
            title.textContent = ` ${node.title || "Untitled folder"}`;

            folderButton.appendChild(chevron);
            folderButton.appendChild(title);

            const childrenList = document.createElement('ul');
            childrenList.className = 'bookmark-children';

            const isOpen = settings.expandBookmarks ? true : localStorage.getItem(currentPath) === "true";
            if (isOpen) {
                chevron.textContent = '▼';
            } else {
                childrenList.classList.add('collapsed');
            }

            folderButton.addEventListener('click', () => {
                const isCollapsed = childrenList.classList.contains('collapsed');
                if (isCollapsed) {
                    childrenList.classList.remove('collapsed');
                    chevron.textContent = '▼';
                    localStorage.setItem(currentPath, "true");
                } else {
                    childrenList.classList.add('collapsed');
                    chevron.textContent = '▶';
                    localStorage.setItem(currentPath, "false");
                }
            });

            listItem.appendChild(folderButton);
            listItem.appendChild(childrenList);
            container.appendChild(listItem);

            processBookmarks(settings, node.children, childrenList, level + 1, currentPath, currentTopLevelFolder);
        } else if (node.url) {
            const listItem = document.createElement('li');
            listItem.className = 'bookmark-link-item';

            const a = document.createElement('a');
            a.href = node.url;
            a.className = 'shortcut';
            const showFavicon = settings.bookmarkFolderFavicons?.[topLevelFolder] === true;

            if (showFavicon) {
                a.classList.add('has-favicon');

                const favicon = document.createElement('img');
                favicon.className = 'bookmark-favicon';
                favicon.src = getFaviconUrl(node.url);
                favicon.alt = '';

                const title = document.createElement('span');
                title.textContent = node.title || node.url;

                a.append(favicon, title);
            } else {
                a.textContent = node.title || node.url;
            }

            listItem.appendChild(a);
            container.appendChild(listItem);
        }
    });
}

function renderBookmarks(settings) {
    chrome.bookmarks.getTree(tree => {
        const shortcuts = document.getElementById('shortcuts');
        let bookmarksBar = settings.bookmarkFolder?.trim()
            ? tree[0].children.find(f => f.title.toLowerCase() === settings.bookmarkFolder.toLowerCase())
            : tree[0].children[0];

        if (settings.bookmarkFolder?.trim() && !bookmarksBar) {
            shortcuts.textContent = "Bookmark folder not found.";
            return;
        }

        const listRoot = document.createElement('ul');
        listRoot.className = 'bookmark-list';
        shortcuts.innerHTML = '';

        processBookmarks(
            settings,
            settings.bookmarkFolder?.trim() ? bookmarksBar.children : tree[0].children,
            listRoot,
            settings.bookmarkFolder?.trim() ? 1 : 0,
            "",
            settings.bookmarkFolder?.trim() ? bookmarksBar.title : ""
        );

        shortcuts.appendChild(listRoot);
    });
}

export { renderBookmarks };
