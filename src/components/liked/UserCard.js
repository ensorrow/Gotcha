import { Link } from 'dva/router';
import Avatar from 'material-ui/Avatar';
import './UserCard.less';

const UserCard = ({ vm, org }) => <div className="user-small">
  <Avatar src={vm.avatar} size={32} />
  <div className="content">
    <div className="txt14b">{org ? vm.name : vm.nickname}</div>
    <div className="txt12 txt-b">{org ? vm.summary : vm.subscribe}</div>
  </div>
  <div className="btn">已关注</div>
</div>;

export default UserCard;
