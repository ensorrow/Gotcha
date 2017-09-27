import styles from './NameCard.less';
import Avatar from 'material-ui/Avatar';
import DetailCard from './DetailCard';

const NameCard = ({ isDetail, dispatch }) => <div className="m-nameCard">
  <Avatar src="http://lvzheyang.top/images/avatar.jpg" />
  <h1>Jack Spark</h1>
  {isDetail ? <div><h2>36岁 加勒比海</h2><h3>大连理工</h3></div> : undefined}
  {isDetail ? <DetailCard /> : undefined}
  {isDetail ? <a onClick={() => dispatch({ type: 'about/toggleAll' })}>收起</a> : <a onClick={() => dispatch({ type: 'about/toggleAll' })}>查看详细资料</a>}
</div>;

export default NameCard;
