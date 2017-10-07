import styles from './AuthorCard.less';
import Avatar from 'material-ui/Avatar';
import LikeButton from '../common/LikeButton';

const AuthorCard = ({ author = {} }) => <div className="authorCard">
  <div className="title">主办方</div>
  <div className="card">
    <div className="header">
      <Avatar src={author.avatar} style={{ float: 'left', margin: '10px' }} />
      <h1>{author.name || '主办方'}</h1>
      <h2>{author.description || '暂无简介'}</h2>
    </div>
    <div className="content">
      <dl>
        <div><dd>{author.events_count}</dd><dt>活动数</dt></div>
        <div><dd>{author.followers_count}</dd><dt>关注数</dt></div>
      </dl>
      <LikeButton liked={author.has_follow} id={author.id} type="org" />
    </div>
  </div>
</div>;

export default AuthorCard;
