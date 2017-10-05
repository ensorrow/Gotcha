import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';
// @TODO: org判断
const MyFollows = ({ follows }) => <div>
  {follows.length ? follows.map(user => <UserCard vm={user} org={user.isorg} key={user.id} />) : '暂无关注用户'}
</div>;

export default connect(({ about }) => ({ follows: about.follows }))(MyFollows);
