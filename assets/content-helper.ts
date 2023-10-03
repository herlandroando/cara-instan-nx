export function labelCategory(category: string) {
    let label = "";
    switch (category) {
        case "document":
            label = "Dokumen";
            break;
        case "media":
            label = "Media";
            break;
        case "it":
            label = "IT";
            break;
        default:
            label = "Unknown";
            break;
    }

    return label;
}

export function slugToTitle(str: string) {
    return titleCase(str.replaceAll("-", " "));
}

export function titleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}