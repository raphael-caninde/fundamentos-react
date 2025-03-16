/* eslint-disable react/prop-types */
import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';

export default function Comment({ content, onDeleteComment }) {
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src={'https://github.com/raphael-caninde.png'}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Raphael Oliveira</strong>
              <time
                title='09 de Janeiro às 23:19'
                dateTime='2025-01-09 23:19:30'
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button
              type='button'
              title='Deletar Comentário'
              onClick={handleDeleteComment}
            >
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button type='button'>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
