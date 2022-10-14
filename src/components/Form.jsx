import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Form = ({ params: { comments, setComments, isEditing, commentEdit, setCommentEdit, setIsEditing } }) => {
    const [values, setValues] = useState({
        email: '',
        comment: ''
    });

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/v1.0/comments', values)
            .then(resp => {
                setComments([...comments, resp.data]);
            })
        setValues({
            email: '',
            comment: ''
        })
    }

    const [emailValid, setEmailValid] = useState(false);
    const isValidEmail = (email) => {
        const regex = /\S+@\S+\.\S+/.test(email);
        setEmailValid(regex);
        return regex;
    }

    const handleChange = e => {
        if ([e.target.name] == 'email') {
            isValidEmail(e.target.value)
        }
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleChangeEdit = e => {
        setCommentEdit({ ...commentEdit, [e.target.name]: e.target.value })
    }

    const handleEdit = e => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/v1.0/comments/${commentEdit._id}`, commentEdit)
            .then(resp => {
                setIsEditing(false)
                const newComments = comments.map(c => {
                    if (c._id == resp.data._id) {
                        return {
                            ...c, comment: resp.data.comment, email: resp.data.email
                        }
                    } else {
                        return c;
                    }
                })
                setComments([...newComments]);
            })
    }


    return (
        <div className='bg-slate-600 px-5 py-4'>
            {isEditing ?
                <form onSubmit={handleEdit}>
                    <div>
                        <div className='py-2'>
                            <label className='font-bold text-xl'>Leave comments</label>
                        </div>
                        <input
                            className='mb-3 w-full text-gray-800 p-1 rounded'
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={commentEdit.email}
                            onChange={handleChangeEdit}
                            disabled
                        />
                    </div>
                    <div>
                        <textarea
                            rows="6"
                            className='mb-3 w-full text-gray-800 p-1 rounded'
                            type="text"
                            name="comment"
                            placeholder='Add a comment...'
                            value={commentEdit.comment}
                            onChange={handleChangeEdit}
                        />
                    </div>
                    <div className='flex item-center justify-center'>
                        <button type='submit' className='bg-teal-600 px-5 py-1 hover:bg-teal-500 m-4 uppercase'>
                            Update!
                        </button>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='py-2'>
                            <label className='font-bold text-xl'>Leave comments</label>
                        </div>
                        {!emailValid
                            ? <div className='text-red-400 flex justify-center p-4 uppercase font-bold'>INVALID EMAIL!</div>
                            : ''
                        }
                        <input
                            className='mb-3 w-full text-gray-800 p-1 rounded'
                            type="text"
                            name="email"
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <textarea
                            rows="6"
                            className='mb-3 w-full text-gray-800 p-1 rounded'
                            type="text"
                            name="comment"
                            placeholder='Add a comment...'
                            value={values.comment}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex item-center justify-center'>
                        <button type='submit' disabled={!emailValid} className='bg-teal-600 px-5 py-1 hover:bg-teal-500 m-4 uppercase'>
                            Comment!
                        </button>
                    </div>
                </form>}
        </div>
    )
}

export default Form