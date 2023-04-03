
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

// export const hoverClassStyle = {
//     Market: props.selectedNav === "Market" ? "" : "headerNavLinks",
//     Drops: props.selectedNav === "Drops" ? "" : "headerNavLinks",
//     Home: props.selectedNav === "Home" ? "" : "headerNavLinks",
//     Blog: props.selectedNav === "Blog" ? "" : "headerNavLinks",
//     Community: props.selectedNav === "Community" ? "" : "headerNavLinks",
//     Create: props.selectedNav === "Create" ? "" : "headerNavLinks",
// };