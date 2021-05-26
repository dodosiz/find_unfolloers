import { IgApiClient } from "instagram-private-api";

interface NonFollower {
    userName: string;
    imageUrl: string;
}

export async function getNonFollowers(userName: string, password: string): Promise<NonFollower[]> {
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
    const nonFollowers = following.filter(f => followerUserNames.indexOf(f.userName) === -1);
    return nonFollowers;
}
