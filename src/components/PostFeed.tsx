import { PostsGetResponse } from "@/internal/ReqRes";
import {
    Avatar,
    Card,
    Flex,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const PostFeed = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [posts, setPosts] = useState<PostsGetResponse[]>([]);

    const getPosts = async () => {
        const response = await fetch(
            "http://localhost:8020/api/v1/posts?offset=" +
                offset +
                "&limit=" +
                limit
        );
        const data: any[] = await response.json();
        if (!response.ok || data == null || data.length === 0) {
            return;
        }
        const newPosts: PostsGetResponse[] = data.map((post) => {
            return {
                post: {
                    id: post.post.id,
                    content: post.post.content,
                    media: post.post.media,
                    createdAt: new Date(post.post.CreatedAt),
                },
                user: {
                    id: post.user.id,
                    username: post.user.username,
                    pfp: post.user.pfp,
                    description: post.user.description,
                },
            };
        });
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setOffset((prevOffset) => prevOffset + limit);
    };

    useEffect(() => {
        if (posts.length === 0 || posts.length < offset) {
            getPosts();
        }
    }, []);

    return (
        <Flex direction={"column"} alignItems={"center"} width={"100%"}>
            <Heading marginBottom={2}>New posts</Heading>
            {posts.map((post) => (
                <Card
                    key={post.post.id}
                    direction={{ base: "column", sm: "row" }}
                    width={"100%"}
                    padding={2}
                    marginY={1}
                >
                    <Avatar src={post.user.pfp} marginRight={2} />

                    <VStack alignItems={"start"} width={"100%"}>
                        <Text fontWeight={"bold"}>
                            {post.user.username} •{" "}
                            {post.post.createdAt.toLocaleDateString()}
                        </Text>
                        <Text>{post.post.content}</Text>
                        <Image objectFit={"cover"} src={post.post.media} />
                    </VStack>
                </Card>
            ))}
        </Flex>
    );
};

export default PostFeed;
