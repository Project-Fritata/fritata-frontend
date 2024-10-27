import { GetPosts } from "@/internal/api/PostsApi";
import { PostsGetResponse } from "@/internal/Models";
import {
    Avatar,
    Card,
    Flex,
    Heading,
    Image,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const PostFeed = () => {
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [posts, setPosts] = useState<PostsGetResponse[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [noPostsLeft, setNoPostsLeft] = useState(false);

    const getPostsStatus = useToast();
    const getPosts = async () => {
        if (isFetching || noPostsLeft) return;
        setIsFetching(true);
        const response = await GetPosts(offset, limit);
        if (response.success && response.data) {
            const newPosts: PostsGetResponse[] = response.data.map((post) => {
                return {
                    post: {
                        id: post.post.id,
                        content: post.post.content,
                        media: post.post.media,
                        createdAt: new Date(post.post.createdAt),
                    },
                    user: {
                        id: post.user.id,
                        username: post.user.username,
                        pfp: post.user.pfp,
                        description: post.user.description,
                    },
                };
            });
            setOffset((prevOffset) => prevOffset + limit);
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            if (newPosts.length < limit) {
                setNoPostsLeft(true);
            }
        } else {
            getPostsStatus({
                title: "Error fetching posts",
                description: response.error,
                status: "error",
                isClosable: true,
            });
        }
        setIsFetching(false);
    };

    useEffect(() => {
        if (posts.length === 0) {
            getPosts();
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight) {
                getPosts();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

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
                    <Avatar
                        src={post.user.pfp}
                        name={post.user.username}
                        marginRight={2}
                    />

                    <VStack alignItems={"start"} width={"100%"}>
                        <Text fontWeight={"bold"}>
                            <ChakraLink
                                as={ReactRouterLink}
                                to={`/fritata-frontend/profile/${post.user.username}`}
                            >
                                {post.user.username}
                            </ChakraLink>
                            {` • ${post.post.createdAt.toLocaleDateString()}`}
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
