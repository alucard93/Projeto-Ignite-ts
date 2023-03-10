import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { format, formatDistanceToNow } from  'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comment/Comment'
import av from '../../assets/Ignite-logo.svg'
import styles from './Post.module.css'
import { PostProps } from '../../interfaces/interfaces'
export const Post = ({ author, content, publishedAt }: PostProps) => {
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
        locale : ptBR,
      },)   

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
        locale : ptBR,
        addSuffix:true,
    })


    function handleCreateNewComment (event: FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText ])
        setNewCommentText('')
    }
    
    function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment (commentToDelete: string) {
        const commentsWithDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        setComments(commentsWithDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={av} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeToNow}</time>

            </header>
            <div className={styles.content}>
                {
                    content.map((line) => {
                        if(line.type == 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        } else if(line.type == 'link') {
                            return <p key={line.content}><a href="#">{line.content}</a></p>
                        }
                    })
                }
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>

            <strong>Deixe seu feedback</strong>
            <textarea 
                name='comment'
                placeholder='Deixe um comentário'
                value={newCommentText}
                onChange={handleNewCommentChange}
                onInvalid={handleNewCommentInvalid}
                required
                />
            <footer>
                <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
            </footer>
            </form>
            <div className={styles.commentList}>
                {
                    comments.map(comment => (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            deleteComment={deleteComment}
                            />
                    ))
                }
            </div>
        </article>
    )
}
