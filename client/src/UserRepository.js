

export default class UserRepository {

    getUserProfile(id) {
        return fetch(
            `/user-profile/${id}`,
            {
                method: 'GET',
                credentials: "same-origin",
                cache: "no-cache",
            }
        );
    }
    getMyDetails(id) {
        return fetch(
            `/user-details`,
            {
                method: 'GET',
                credentials: "same-origin",
                cache: "no-cache",
            }
        );
    }

    addFriendByUsername(username) {
        const body = JSON.stringify({username});
        const headers = {'Content-Type': 'application/json'};
        return fetch('/add-friend', {
            method: 'POST',
            headers,
            body,
            credentials: "same-origin",
            cache: "no-cache"
        });
    }
}