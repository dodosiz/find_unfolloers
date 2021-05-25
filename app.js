const api = require('instagram-private-api');

const IG_USERNAME = "user_name";
const IG_PASSWORD = "password";

(async () => {
  const ig = new api.IgApiClient();
  ig.state.generateDevice(IG_USERNAME);
  const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
  const followersFeed = ig.feed.accountFollowers(auth.pk);
  const wholeResponse = await followersFeed.request();
  console.log(wholeResponse); // You can reach any properties in instagram response
  const items = await followersFeed.items();
  console.log(items); // Here you can reach items. It's array.
  const thirdPageItems = await followersFeed.items();
  // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
  console.log(thirdPageItems); // Here you can reach items. It's array.
  const feedState = followersFeed.serialize(); // You can serialize feed state to have an ability to continue get next pages.
  console.log(feedState);
  followersFeed.deserialize(feedState);
  const fourthPageItems = await followersFeed.items();
  console.log(fourthPageItems);
  // You can use RxJS stream to subscribe to all results in this feed.
  // All the RxJS powerful is beyond this example - you should learn it by yourself.
  followersFeed.items$.subscribe(
    followers => console.log(followers),
    error => console.error(error),
    () => console.log('Complete!'),
  );
})();