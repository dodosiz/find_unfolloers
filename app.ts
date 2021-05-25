import {IgApiClient} from 'instagram-private-api';

const IG_USERNAME = "user_name";
const IG_PASSWORD = "password";

async function getNonFollowers(userName, password) {
    const ig = new IgApiClient();
    ig.state.generateDevice(userName);
    const auth = await ig.account.login(userName, password);
    // followers
    const followersFeed = ig.feed.accountFollowers(auth.pk);
    const followersResponse = await followersFeed.request();
    const followerUserNames = followersResponse.users.map(u => u.username);
    // following
    const followingFeed = ig.feed.accountFollowing(auth.pk);
    const followingResponse = await followingFeed.request();
    const following = followingResponse.users
        .map(u => ({userName: u.username, imageUrl: u.profile_pic_url}));
    // non followers
    const nonFollowers = following.filter(f => followerUserNames.indexOf(f.userName) == -1);
    return nonFollowers;
}

getNonFollowers(IG_USERNAME, IG_PASSWORD);
