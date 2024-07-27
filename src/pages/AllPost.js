import React, { useState, useEffect , useContext } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';


function AllPosts() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // Fetch posts on component mount
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  return (
    <div className={`py-12 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen`}>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="p-4 shadow-lg rounded-lg">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
