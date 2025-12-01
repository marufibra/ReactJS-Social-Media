import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom'
import moment from 'moment';

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");//desc
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

    // const upload = async () => {
    //     if (!file) return null;// No uploads when there is no file
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', file)

    //         const url = `${import.meta.env.VITE_API_URL}/upload`;
    //         const res = await axios.post(url,formData);
    //         return res.data;

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const navigate = useNavigate();

    const upload = async () => {
        if (!file) return null;// No uploads when there is no file
        try {
            const formData = new FormData();
            formData.append('file', file);

            const url = `${import.meta.env.VITE_API_URL}/upload`;
            
            const res = await axios.post(url, formData);
            // console.log (res.data.url);
            return res.data.url; // Cloudinary URL
        } catch (err) {
            console.log(err);
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state ? await axios.put(`${import.meta.env.VITE_API_URL}/posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: file ? imgUrl : "",
            }, { withCredentials: true })
                : await axios.post(`${import.meta.env.VITE_API_URL}/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                }, { withCredentials: true })

        } catch (err) {
            console.log(err)
        }

        navigate("/");
    }

    return (
        <div className='add'>
            <div className="content">
                <input value={title} type="text" name="" id="" placeholder='Title' onChange={e => setTitle(e.target.value)} />

                <div className="editorContainer">
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status</b> <span>Draft</span>
                    </span>
                    <span>
                        <b>Visibility:</b> <span>Public</span>
                    </span>
                    <input style={{ display: 'none' }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>

                </div>
                <div className="item">

                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'art'} name="cat" value='art' id="art" onChange={e => setCat(e.target.value)} /></span>
                        <span >Art</span>
                    </label>


                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'science'} name="cat" value='science' id="science" onChange={e => setCat(e.target.value)} /></span>
                        <span>Science</span>
                    </label>

                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'technology'} name="cat" value='technology' id="technology" onChange={e => setCat(e.target.value)} /></span>
                        <span>Technology</span>
                    </label>

                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'cinema'} name="cat" value='cinema' id="cinema" onChange={e => setCat(e.target.value)} /></span>
                        <span>Cinema</span>
                    </label>

                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'design'} name="cat" value='design' id="design" onChange={e => setCat(e.target.value)} /></span>
                        <span>Design</span>
                    </label>

                    <label className='cat'>
                        <span><input type="radio" checked={cat === 'food'} name="cat" value='food' id="food" onChange={e => setCat(e.target.value)} /></span>
                        <span>Food</span>
                    </label>

                </div>
            </div>
        </div>
    )
}

export default Write;