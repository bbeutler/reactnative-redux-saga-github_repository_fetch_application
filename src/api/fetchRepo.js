export const fetchRepo = ({repo_name}) => {
    const URL = `https://api.github.com/search/repositories?q=${repo_name}&sort=updated&order=desc`;
    return fetch(URL)
            .then((res) => res.json());
}