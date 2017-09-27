import Avatar from 'material-ui/Avatar';
import './ActivityCard.less';

const ActivityCard = () => <div className="m-miniCard">
  <div className="imgWrapper">
    <img src={require('../../assets/test.png')} />
  </div>
  <div className="textWrapper">
    <h2>专业摄影师教你如何拍好柱子</h2>
    <h3>
      <Avatar src="http://lvzheyang.top/images/avatar.jpg" size={20} />
      <span>摄影师TOM</span>
      <span>·</span>
      <span>1256人参与</span>
    </h3>
  </div>
</div>;

export default ActivityCard;
