import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const Feed = () => {
    const [posts, setPosts] = useState([
        {
            _id: 1,
            image: "https://ik.imagekit.io/Taryn/image__GMyM1m_A.jpg?updatedAt=1770059146992",
            caption: "This is a sample caption for post 1"
        },
    ])
    useEffect(() => {
        axios.get("http://localhost:3000/feed")
            .then((res) => {
                // console.log(res.data.posts);
                setPosts(res.data.posts)
            })
    }, [])
    return (
         <>
             <h2 className='Feed-title'>Feed Page</h2>
        <section className="feed-section">
       
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                )
                    : (
                        <h1>No posts available</h1>
                    )
            }

        </section>
         </>
    )
}

export default Feed