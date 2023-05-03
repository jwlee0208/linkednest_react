export const movePage = (urlPath : string, e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.location.href = urlPath;
}
