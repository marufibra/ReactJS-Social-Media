import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([])

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const cat = query.get("cat");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/posts${cat ? `?cat=${cat}` : ""}`;
                const res = await axios.get(url);
                // console.log("FETCHING FROM URL:", `${import.meta.env.VITE_API_URL}/posts${cat ? `?cat=${cat}` : ""}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);


    const imgUrl = `${import.meta.env.VITE_URL}/uploads/`;

    const htmlToText = (html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };

    

    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    // ];



    return (
        <div className='home'>
            <div className='posts'>
                {
                    posts.map((post) => (
                        <div className='post' key={post.id}>
                            <div className='img'>
                                <img src={imgUrl + post.img} alt="" />
                            </div>
                            <div className='content'>

                                <h1>{post.title}</h1>

                                {/* <p dangerouslySetInnerHTML={{ __html: post.desc }}></p> */}
                                <p>{htmlToText(post.desc).slice(0, 100) + "..."}</p>
                                <Link className='link' to={`/post/${post.id}`}>
                                    <button>Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;