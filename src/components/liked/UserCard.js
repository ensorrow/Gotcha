import { Link } from 'dva/router';
import Avatar from 'material-ui/Avatar';
import './UserCard.less';
import LikeButton from '../common/LikeButton';

const UserCard = ({ vm, org }) => <div className="user-small">
  <Avatar src={vm.avatar} size={32} />
  <div className="content">
    <div className="txt14b">{org ? vm.name : vm.nickname}</div>
    <div className="txt12 txt-b">{org ? vm.summary : vm.subscribe}</div>
  </div>
  <LikeButton id={vm.id} liked={vm.has_follow} />
</div>;

export default UserCard;
