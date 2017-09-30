import Avatar from 'material-ui/Avatar';
import './ActivityCard.less';
import { Link } from 'dva/router';

const ActivityCard = ({ vm }) => <Link to={"/detail?id="+vm.id} >
  <div className="m-miniCard">
    <div className="imgWrapper">
      <img src={require('../../assets/test.png')} />
    </div>
    <div className="textWrapper">
      <h2>{vm.title}</h2>
      <h3>
        <Avatar src={ vm.organizer.avatar || 'http://lvzheyang.top/images/avatar.jpg' } size={20} />
        <span>{vm.organizer.name || '未命名'}</span>
        <span>·</span>
        <span>{vm.users_count}人参与</span>
      </h3>
    </div>
  </div>
</Link>;

export default ActivityCard;
