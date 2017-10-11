import { Link } from 'dva/router';
import Avatar from 'material-ui/Avatar';
import './UserCard.less';
import LikeButton from '../common/LikeButton';

const UserCard = ({ vm, type }) => <div className="user-small">
  <Link to={type !== 'user' ? `/author?id=${vm.id}` : `/user?id=${vm.id}`}>
    <Avatar className="avatar" src={vm.avatar} size={36} />
  </Link>
  <div className="content">
    <h1>{type !== 'user' ? vm.name||'未命名' : vm.nickname||'未命名'}</h1>
    <h2>{type !== 'user' ? vm.summary || '无相关信息' : vm.subscribe || '无相关信息'}</h2>
  </div>
  <LikeButton className="likeBtn" id={vm.id} liked={vm.has_follow} type={type} />
</div>;

export default UserCard;
