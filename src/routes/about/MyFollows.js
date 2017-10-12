import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';
// @TODO: org判断
const MyFollows = ({ follows }) => <div>
  {follows.length ? follows.map(user => {
    user.has_follow = true;// 接口信息有误修正
    return <UserCard vm={user} type="user" key={user.id} />
  }) : '暂无关注用户'}
</div>;

export default connect(({ about }) => ({ follows: about.follows }))(MyFollows);
