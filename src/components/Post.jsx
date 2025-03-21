/* eslint-disable react/prop-types */
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar } from './Avatar';
import Comment from './Comment';
import styles from './Post.module.css';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState(['nossa, que incrível!']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText('');
  }

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteComment(commentToDelete) {
    const commentDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    setComments(commentDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          }
          if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href='/'>{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form
        onSubmit={handleCreateNewComment}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newCommentText}
          placeholder='Deixe um comentário'
          onInvalid={handleNewCommentInvalid}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button
            type='submit'
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
