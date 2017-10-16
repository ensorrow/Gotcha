import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'dva/router';
import './CommentBox.less';
import Commend from '../common/Commend';
import Divider from 'material-ui/Divider';

const CommentItem = ({ comment }) => <div className="u-comment">
  <Link to={`/user?id=${comment.user.id}`} style={{left: 0, top: 12}} className="avatar"><img src={comment.user.avatar} alt=""/></Link>
  <div className="content">
    <Commend id={comment.id} className="commend" count={comment.likes_count} />
    <h1>{comment.user.nickname || '未命名'}</h1>
    <h2>{comment.date || '1月2日'}</h2>
    <p>{comment.content}</p>
    {
      comment.reply && <div className="inner">
        <h3>主办方回复：</h3>
        <p>{comment.reply}</p>
      </div>
    }
  </div>
</div>

const CommentBox = ({ comments }) => <div className="m-comment u-card">
  <h1 className="u-title"><i className="icon icon-discuss"></i> 活动评价</h1>
  {comments.map((comment, index) => <CommentItem comment={comment} key={index} />)}
</div>;

export default CommentBox;
