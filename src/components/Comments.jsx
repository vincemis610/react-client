import React, { useContext } from 'react'
import axios from 'axios'

const Comments = ({ params: { comments, setComments, setIsEditing, setCommentEdit } }) => {
    const handleEdit = (id) => {
        setIsEditing(true)
        axios.get(`http://localhost:3000/api/v1.0/comments/${id}`)
            .then(resp => {
                setCommentEdit(resp.data)
            })
    }

    const handleRemove = (id) => {
        axios.delete(`http://localhost:3000/api/v1.0/comments/${id}`)
            .then(resp => {
                const data = comments.filter(c => c._id !== id)
                setComments(data)
            })
    }

    return (
        <div className='bg-slate-100 text-gray-700 mx-auto justify-center px-10'>
            <div className='py-3'>
                {(comments && comments.length > 0) ?
                    comments.map(comment => {
                        return (
                            <div className='p-3 border mb-2 border-gray-500' key={comment._id}>
                                <div className='font-bold'>{comment.email}</div>
                                <div className='text-slate-500'>{comment.comment}</div>
                                <div className='mt-3'>
                                    <button
                                        className='rounded bg-red-600 p-1 px-4 text-slate-100 hover:bg-red-500'
                                        onClick={() => handleEdit(comment._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='rounded bg-teal-600 mx-2 p-1 text-slate-100 hover:bg-teal-500'
                                        onClick={() => handleRemove(comment._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }) : <div>
                        There's no comments!
                    </div>
                }
            </div>

        </div>
    )
}

export default Comments