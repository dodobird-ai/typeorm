"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../../utils/test-setup");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const User_1 = require("./entity/User");
describe("mongodb > basic repository actions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("create should create instance of same entity", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        postRepository.create().should.be.instanceOf(Post_1.Post);
    })));
    it("create should be able to fill data from the given object", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = postRepository.create({
            title: "This is created post",
            text: "All about this post",
        });
        post.should.be.instanceOf(Post_1.Post);
        post.title.should.be.equal("This is created post");
        post.text.should.be.equal("All about this post");
    })));
    it("merge should merge all given partial objects into given source entity", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = postRepository.create({
            title: "This is created post",
            text: "All about this post",
        });
        const mergedPost = postRepository.merge(post, { title: "This is updated post" }, { text: "And its text is updated as well" });
        mergedPost.should.be.instanceOf(Post_1.Post);
        mergedPost.should.be.equal(post);
        mergedPost.title.should.be.equal("This is updated post");
        mergedPost.text.should.be.equal("And its text is updated as well");
    })));
    it("merge should merge all given recursive partial objects into given source entity", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const counter1 = new Counters_1.Counters();
        counter1.likes = 5;
        const counter2 = new Counters_1.Counters();
        counter2.likes = 2;
        counter2.viewer = new User_1.User();
        counter2.viewer.name = "Hello World";
        const post = postRepository.create({
            title: "This is created post",
            text: "All about this post",
            counters: counter1,
        });
        const mergedPost = postRepository.merge(post, { title: "This is updated post" }, { text: "And its text is updated as well" }, { counters: counter2 });
        mergedPost.should.be.instanceOf(Post_1.Post);
        mergedPost.should.be.equal(post);
        mergedPost.title.should.be.equal("This is updated post");
        mergedPost.text.should.be.equal("And its text is updated as well");
        mergedPost.counters.likes.should.be.equal(2);
        mergedPost.counters.viewer.name.should.be.equal("Hello World");
    })));
    it("target should be valid", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        (0, chai_1.expect)(postRepository.target).not.to.be.undefined;
        postRepository.target.should.be.eql(Post_1.Post);
    })));
    it("should persist entity successfully and after persistence have generated object id", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.title = "Post #1";
        post.text = "Everything about post!";
        await postRepository.save(post);
        (0, chai_1.expect)(post.id).not.to.be.undefined;
    })));
    it("hasId should return true if id really has an id", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.title = "Post #1";
        post.text = "Everything about post!";
        await postRepository.save(post);
        (0, chai_1.expect)(post.id).not.to.be.undefined;
        postRepository.hasId(post).should.be.true;
    })));
    it("unsupported methods should throw exception", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        (0, chai_1.expect)(() => postRepository.createQueryBuilder("post")).to.throw(Error);
        (0, chai_1.expect)(() => postRepository.query("SELECT * FROM POSTS")).to.throw(Error);
    })));
    it("should return persisted objects using find* methods", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        const post1 = new Post_1.Post();
        post1.title = "First Post";
        post1.text = "Everything about first post";
        await postRepository.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Second Post";
        post2.text = "Everything about second post";
        await postRepository.save(post2);
        // save few posts
        const posts = [];
        for (let i = 0; i < 50; i++) {
            const post = new Post_1.Post();
            post.title = "Post #" + i;
            post.text = "Everything about post #" + i;
            posts.push(post);
        }
        await postRepository.save(posts);
        // assert.findOne method
        const loadedPost1 = await postRepository.findOneBy({
            _id: post1.id,
        });
        (0, chai_1.expect)(loadedPost1.id).to.be.eql(post1.id);
        (0, chai_1.expect)(loadedPost1.title).to.be.equal("First Post");
        (0, chai_1.expect)(loadedPost1.text).to.be.equal("Everything about first post");
        // assert findOne method
        const loadedPost2 = await postRepository.findOneBy({
            title: "Second Post",
        });
        (0, chai_1.expect)(loadedPost2.id).to.be.eql(post2.id);
        (0, chai_1.expect)(loadedPost2.title).to.be.equal("Second Post");
        (0, chai_1.expect)(loadedPost2.text).to.be.equal("Everything about second post");
        // assert findByIds method
        const loadedPost3 = await postRepository.findByIds([
            post1.id,
            post2.id,
        ]);
        (0, chai_1.expect)(loadedPost3[0].id).to.be.eql(post1.id);
        (0, chai_1.expect)(loadedPost3[0].title).to.be.equal("First Post");
        (0, chai_1.expect)(loadedPost3[0].text).to.be.equal("Everything about first post");
        (0, chai_1.expect)(loadedPost3[1].id).to.be.eql(post2.id);
        (0, chai_1.expect)(loadedPost3[1].title).to.be.equal("Second Post");
        (0, chai_1.expect)(loadedPost3[1].text).to.be.equal("Everything about second post");
        // assert find method
        const loadedPosts1 = await postRepository.find({
            skip: 10,
            take: 10,
        });
        loadedPosts1.length.should.be.equal(10);
        (0, chai_1.expect)(loadedPosts1[0].id).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts1[0].title).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts1[0].text).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts1[9].id).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts1[9].title).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts1[9].text).not.to.be.undefined;
        // assert find method
        const [loadedPosts2, loadedPosts2Count] = await postRepository.findAndCount({
            skip: 5,
            take: 5,
        });
        loadedPosts2.length.should.be.equal(5);
        loadedPosts2Count.should.be.equal(52);
        (0, chai_1.expect)(loadedPosts2[0].id).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts2[0].title).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts2[0].text).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts2[4].id).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts2[4].title).not.to.be.undefined;
        (0, chai_1.expect)(loadedPosts2[4].text).not.to.be.undefined;
    })));
    it("should sort entities in a query", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save few posts
        const posts = [];
        for (let i = 0; i < 10; i++) {
            const post = new Post_1.Post();
            post.title = "Post #" + i;
            post.text = "Everything about post #" + i;
            post.index = i;
            posts.push(post);
        }
        await postRepository.save(posts);
        // ASCENDANT SORTING
        let queryPostsAsc = await postRepository.find({
            order: { index: "ASC" },
        });
        queryPostsAsc.length.should.be.equal(10);
        for (let i = 0; i < 10; i++) {
            (0, chai_1.expect)(queryPostsAsc[i].index).eq(i);
        }
        // DESCENDANT SORTING
        let queryPostsDesc = await postRepository.find({
            order: { index: "DESC" },
        });
        queryPostsDesc.length.should.be.equal(10);
        for (let j = 0; j < 10; j++) {
            (0, chai_1.expect)(queryPostsDesc[j].index).eq(9 - j);
        }
    })));
    it("clear should remove all persisted entities", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save few posts
        const posts = [];
        for (let i = 0; i < 50; i++) {
            const post = new Post_1.Post();
            post.title = "Post #" + i;
            post.text = "Everything about post #" + i;
            posts.push(post);
        }
        await postRepository.save(posts);
        const [loadedPosts, postsCount] = await postRepository.findAndCount();
        (0, chai_1.expect)(postsCount).to.be.equal(50);
        loadedPosts.length.should.be.equal(50);
        await postRepository.clear();
        const [loadedPostsAfterClear, postsCountAfterClear] = await postRepository.findAndCount();
        (0, chai_1.expect)(postsCountAfterClear).to.be.equal(0);
        loadedPostsAfterClear.should.be.eql([]);
    })));
    it("remove should remove given entity", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        const post1 = new Post_1.Post();
        post1.title = "First Post";
        post1.text = "Everything about first post";
        await postRepository.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Second Post";
        post2.text = "Everything about second post";
        await postRepository.save(post2);
        const loadedPost1 = await postRepository.findOneBy({
            _id: post1.id,
        });
        await postRepository.remove(loadedPost1);
        await postRepository.remove(post2);
        const [loadedPostsAfterClear, postsCountAfterClear] = await postRepository.findAndCount();
        (0, chai_1.expect)(postsCountAfterClear).to.be.equal(0);
        loadedPostsAfterClear.should.be.eql([]);
    })));
    it("clear should remove all persisted entities", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save few posts
        const posts = [];
        for (let i = 0; i < 50; i++) {
            const post = new Post_1.Post();
            post.title = "Post #" + i;
            post.text = "Everything about post #" + i;
            posts.push(post);
        }
        await postRepository.save(posts);
        const [loadedPosts, postsCount] = await postRepository.findAndCount();
        (0, chai_1.expect)(postsCount).to.be.equal(50);
        loadedPosts.length.should.be.equal(50);
        await postRepository.clear();
        const [loadedPostsAfterClear, postsCountAfterClear] = await postRepository.findAndCount();
        (0, chai_1.expect)(postsCountAfterClear).to.be.equal(0);
        loadedPostsAfterClear.should.be.eql([]);
    })));
    it("preload should pre-load given object", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a post first
        const postToSave = new Post_1.Post();
        postToSave.title = "First Post";
        postToSave.text = "Everything about first post";
        await postRepository.save(postToSave);
        // now preload a post with setting
        const post = await postRepository.preload({
            id: postToSave.id,
            title: "This is updated post",
        });
        // console.log(post);
        post.should.be.instanceOf(Post_1.Post);
        post.id.should.be.equal(postToSave.id);
        post.title.should.be.equal("This is updated post");
        post.text.should.be.equal("Everything about first post");
    })));
});
//# sourceMappingURL=mongodb-repository-actions.js.map