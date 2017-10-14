import ActivityCard from '../../components/index/ActivityCard';
import { connect } from 'dva';
import './MyCollect.less';
import Scroll from '../../components/common/Scroll';

const MyCollect = ({ collects, dispatch }) => {
  function moreAction(page){
    dispatch({ type: 'about/getCollects', payload: { page } });
  }
  return <Scroll moreAction={moreAction} pagination={collects.meta.pagination}>
    <div className="m-collect">
      {collects.data.length ? collects.data.map(event => <ActivityCard vm={event} lg key={event.id} />) : '暂无收藏活动'}
    </div>
  </Scroll>;
};

export default connect(({ about }) => ({ collects: about.collects }))(MyCollect);
