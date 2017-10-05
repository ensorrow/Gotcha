import { Link } from 'dva/router';
import Avatar from 'material-ui/Avatar';
import './UserCard.less';
import LikeButton from '../common/LikeButton';

const UserCard = ({ vm, type }) => <div className="user-small">
  <Link to={type !== 'user' ? '/author?id=' + vm.id : '/user?id=' + vm.id}>
    <Avatar src={vm.avatar} size={32} />
  </Link>
  <div className="content">
    <div className="txt14b">{type !== 'user' ? vm.name : vm.nickname}</div>
    <div className="txt12 txt-b">{type !== 'user' ? vm.summary : vm.subscribe}</div>
  </div>
  <LikeButton id={vm.id} liked={vm.has_follow} type={type} />
</div>;

export default UserCard;
