import React, { useEffect, useState, useContext } from 'react'
import Comments from '../components/Comments'
import Form from '../components/Form'
import axios from 'axios'

const Home = () => {
    const [comments, setComments] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [commentEdit, setCommentEdit] = useState({});
    const [allComments, setAllComments] = useState();

    const filterComments = e => {
        if (e.key === "Enter") {
            console.log(e.target.value)
            if (e.target.value == '') {
                return setComments(allComments)
            }
            const filtered = comments.filter(v => {
                if (v.email.includes(e.target.value)) {
                    return v;
                }
            })
            setComments(filtered)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1.0/comments')
            .then(resp => {
                let { data } = resp;
                if (data.msg) {
                    return setComments([])
                }
                setAllComments(data)
                setComments(data)
            })
    }, [])

    return (
        <div className='container text-white py-5 mx-auto' >
            <div className='py-5 flex justify-center gap-20 w-full'>
                <div className="w-1/3">
                    <Form params={{ comments, setComments, isEditing, commentEdit, setCommentEdit, setIsEditing }} />
                </div>
                <div className="w-2/3 ">
                    <input
                        className='mb-3 w-full text-gray-800 p-1 rounded'
                        type="email"
                        name="email"
                        onKeyUp={filterComments}
                        placeholder='Filtrar por correo'
                    />
                    <Comments params={{ comments, setComments, setIsEditing, setCommentEdit }} />
                </div>

            </div>
        </div >
    )
}

export default Home