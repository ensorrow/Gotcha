import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';

const MyFans = ({fans}) => <div>
    {fans.length ? fans.map(user => <UserCard vm={user} key={user.id} />) : '暂无粉丝'}
</div>

export default connect(({ about }) => ({ fans: about.fans }))(MyFans);