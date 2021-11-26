const axios = require('axios');

const usersUrl = 'http://jsonplaceholder.typicode.com/users';
const postUrl = 'http://jsonplaceholder.typicode.com/posts';

async function buildData() {
    const users = (await axios.get(usersUrl)).data;
    const posts = (await axios.get(postUrl)).data

    let data = [];

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < posts.length; j++) {
            if (users[i].id === posts[j].userId) {
                delete posts[j].userId
                data.push({
                    id: users[i].id,
                    name: users[i].name,
                    email: users[i].email,
                    address: users[i].address.city + ', ' + users[i].address.street + ', ' + users[i].address.suite,
                    website: 'https://' + users[i].website,
                    company: users[i].company.name,
                    posts: posts[j]
                })
                break;
            }
        }
    }
    console.log(data)
}

buildData();
