import ActivityCard from '../../components/index/ActivityCard';
import { connect } from 'dva';

const MyCollect = ({collects}) => <div>
    {collects.length ? collects.map(event => <ActivityCard vm={event} lg key={event.id} />) : '暂无收藏活动'}
</div>

export default connect(({ about }) => ({ collects: about.collects }))(MyCollect);