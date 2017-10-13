import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'dva/router';
import './CommentBox.less';
import Commend from '../common/Commend';
import Divider from 'material-ui/Divider';

const CommentBox = ({ comments }) => <div className="m-comment u-card">
  <h1 className="u-title"><i className="icon icon-discuss"></i> 活动评价</h1>
  <List>
    {comments.map((comment, index) => <div key={index}>
      <ListItem
        leftAvatar={<Link to={`/user?id=${comment.user.id}`} style={{left: 0, top: 12}}><Avatar size={30} src={comment.user.avatar || 'http://lvzheyang.top/images/avatar.jpg'} /></Link>  }
        rightIconButton={<Commend id={comment.id} liked={false} count={comment.likes_count} />}
        primaryText={<div><h1>{comment.user.nickname || '未命名'}</h1><h2>{}1月2日</h2></div>}
        secondaryText={
          <p>{comment.content}</p>
        }
        style={{}}
        innerDivStyle={{paddingLeft: 40, paddingTop: 12}}
      >
      
      </ListItem>
      <Divider style={{marginLeft: 40}} inset={true} />
    </div>)}
  </List>
</div>;

export default CommentBox;
