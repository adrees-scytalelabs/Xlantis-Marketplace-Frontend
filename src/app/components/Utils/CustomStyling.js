
export const hoverClassStyleTest = (selectedNav) => {
    return({
        Market: selectedNav === "Market" ? "" : "headerNavLinks",
        Drops: selectedNav === "Drops" ? "" : "headerNavLinks",
        Home: selectedNav === "Home" ? "" : "headerNavLinks",
        Blog: selectedNav === "Blog" ? "" : "headerNavLinks",
        Community: selectedNav === "Community" ? "" : "headerNavLinks",
        Create: selectedNav === "Create" ? "" : "headerNavLinks",
    });
}








