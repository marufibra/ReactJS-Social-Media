import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/Menu';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../context/authContext';


const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation();
    const postId = location.pathname.split("/").at(-1);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
                const res = await axios.get(url);

                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {

        try {
            const url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
            await axios.delete(url, { withCredentials: true });
            navigate("/");

        } catch (err) {
            console.log(err);
        }
    }

    // const imgUrl = `${import.meta.env.VITE_URL}/uploads/`;

    return (
        <div className='single'>
            <div className="content">
                <img src={ post.postImg} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>John</span>
                        <p>Posted  {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <div className='p-text' dangerouslySetInnerHTML={{ __html: post.desc }}></div>

            </div>
            <Menu cat={post.cat} />
        </div>
    )
}

export default Single;