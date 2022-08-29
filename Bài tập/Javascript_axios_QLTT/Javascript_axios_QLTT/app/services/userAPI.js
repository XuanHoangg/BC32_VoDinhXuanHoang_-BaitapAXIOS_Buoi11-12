function apiGetUser(searchUser) {
    return axios({
        url: 'https://6306fe5b3a2114bac75770c3.mockapi.io/users',
        method: 'GET',
        params: {
            name: searchUser,
        }
    });
};
function apiAddUser(user) {
    return axios({
        url: 'https://6306fe5b3a2114bac75770c3.mockapi.io/users',
        method: 'POST',
        data: user
    });
};
function apiDeleteUser(userId) {
    return axios({
        url: `https://6306fe5b3a2114bac75770c3.mockapi.io/users/${userId}`,
        method: 'DELETE',
    });
};
function apiGetUserById(userId) {
    return axios({
        url: `https://6306fe5b3a2114bac75770c3.mockapi.io/users/${userId}`,
        method: 'GET',
    });
};
function apiUpdateUser(userId, user) {
    return axios({
        url: `https://6306fe5b3a2114bac75770c3.mockapi.io/users/${userId}`,
        method: 'PUT',
        data: user
    });
};
// function apiGetUserByAccount(userAccount) {
//     return axios({
//         url: `https://6306fe5b3a2114bac75770c3.mockapi.io/users/${userAccount}`,
//         method: 'GET',
//     });
// };









