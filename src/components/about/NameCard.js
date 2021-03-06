import styles from './NameCard.less';
import Avatar from 'material-ui/Avatar';
import DetailCard from './DetailCard';

const NameCard = ({ isDetail, dispatch, vm }) => <div className="m-nameCard">
  <Avatar size={64} src={vm.avatar || 'http://lvzheyang.top/images/avatar.jpg'} />
  <h1>{vm.nickname || '还没有名字呢'}</h1>
  {isDetail ? <div><h2>{(new Date().getFullYear()-new Date(vm.birthday).getFullYear())+'岁' || '未填写年龄信息'} {vm.city}</h2><h3>{vm.university || '未填写大学信息'}</h3></div> : undefined}
  {isDetail ? <DetailCard vm={vm} /> : undefined}
  {isDetail ? <a onClick={() => dispatch({ type: 'about/toggleAll' })}><i className="icon icon-dup"></i></a> : <a onClick={() => dispatch({ type: 'about/toggleAll' })}>查看详细资料<i className="icon icon-ddown"></i></a>}
</div>;

export default NameCard;
